/* global define */

define([
    'underscore',
    'backbone',
    '../utils'
], function(_, Backbone, utils) {

    var Result = Backbone.Model.extend({
        url: function() {
            return '' + utils.getRootUrl() + 'api/samples/variants/' + this.id + '/';
        },

        parse: function(attrs) {
            var variant = attrs.variant;

            // Bit of a hacked use of sortBy...
            variant.effects = _.sortBy(variant.effects, function(eff) {
                return utils.effectImpactPriority(eff.impact);
            });

            var uniqueGenes = {},
                genes = [];

            _.each(variant.effects, function(eff) {
                if (!eff.transcript || !(gene = eff.transcript.gene)) return;

                if (/^LOC\d+/.test(gene.symbol) || (uniqueGenes[gene.symbol] != null)) return;

                uniqueGenes[gene.symbol] = true;
                genes.push({
                    symbol: gene.symbol,
                    hgnc_id: gene.hgnc_id,
                    name: gene.name,
                    articles: _.uniq(gene.articles),
                    phenotypes: _.uniq(gene.phenotypes, false, function(item) {
                        return item.hpo_id;
                    })
                });
            });

            variant.uniqueGenes = genes;
            return attrs;
        }
    });

    return {
        Result: Result
    };
});
