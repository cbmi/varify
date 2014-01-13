define [
    'underscore'
    'marionette'
    'cilantro'
    'cilantro/ui/base'
    '../../models'
    '../../templates'
    'tpl!templates/varify/empty.html'
], (_, Marionette, c, base, models, Templates, templates...) ->

    templates = _.object ['empty'], templates

    class ResultRow extends Marionette.ItemView
        className: 'area-container variant-container'

        template: templates.empty

        tagName: 'tr'

        initialize: ->
            @data = {}
            if not (@data.resultPk = @options.resultPk)
                throw new Error 'result pk required'
            if not (@data.rootUrl = @options.rootUrl)
                throw new Error 'root url required'

            @model = new models.Result
                id: @data.resultPk
                rootUrl: @options.rootUrl
            @model.on 'sync', @onSync

        onSync: =>
            variant = @model.get('variant')
            assessment = @model.get('assessment')

            $gene = $(Templates.geneLinks(variant.uniqueGenes, collapse: true))
                .addClass('genes')

            $hgvsP = $(Templates.hgvsP(variant.effects))
                .addClass('hgvs-p')

            $variantEffects = $(Templates.variantEffects(variant.effects, true))
                .addClass('variant-effects')
                .append($(Templates.pathogenicity(assessment)))

            # NOTE: As of Bootstrap 2.3.1 there is still an issue with adding
            # tooltips to <td> elements directly as the tooltip will be
            # instered directly into the table, causing the row to be
            # misaligned. The workaround(added in 2.3.0) is to
            # set the container to body so that the div is not jammed into the
            # table all willy-nilly like.
            $hgvsC = $(Templates.hgvsC(variant.effects))
                .addClass('hgvs-c')
                .tooltip({container: 'body'})

            $genotype = $(Templates.genotype(@model.get('genotype_value'), @model.get('genotype_description')))
                .addClass('genotype')
                .tooltip({container: 'body'})

            $genomicPosition = $(Templates.genomicPosition(variant.chr, variant.pos))
                .addClass('genomic-position')
                .append($(Templates.category(assessment)))

            $condensedFlags = $(Templates.condensedFlags(variant))

            @$el.empty()
            @$el.append $gene, $hgvsP, $variantEffects, $hgvsC, $genotype, $genomicPosition, $condensedFlags

        onRender: =>
            @model.fetch()


    class EmptyResultRow extends base.LoadView
        align: 'left'

        tagName: 'tr'


    { ResultRow, EmptyResultRow }
