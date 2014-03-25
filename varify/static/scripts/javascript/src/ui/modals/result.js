// Generated by CoffeeScript 1.7.1
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'marionette', '../../models', '../../utils', '../../templates', 'cilantro/utils/numbers'], function(_, Marionette, models, utils, Templates, Numbers) {
  var AssessmentTab, DetailsTab, ResultDetails;
  DetailsTab = (function(_super) {
    __extends(DetailsTab, _super);

    function DetailsTab() {
      this.render = __bind(this.render, this);
      this.fetchMetricsSuccess = __bind(this.fetchMetricsSuccess, this);
      this.fetchMetricsError = __bind(this.fetchMetricsError, this);
      this.collapseAssessmentRow = __bind(this.collapseAssessmentRow, this);
      this.expandAssessmentRow = __bind(this.expandAssessmentRow, this);
      return DetailsTab.__super__.constructor.apply(this, arguments);
    }

    DetailsTab.prototype.template = function() {};

    DetailsTab.prototype.initialize = function() {
      this.metrics = this.options.metrics;
      this.$content = $('<div class="content">');
      this.$el.append(this.$content);
      return this.$el.attr('id', 'variant-details-content');
    };

    DetailsTab.prototype.events = {
      'click .cohort-sample-popover': function(e) {
        return $('.cohort-sample-popover').not(e.target).popover('hide');
      },
      'click .assessment-details-table .icon-plus': 'expandAssessmentRow',
      'click .assessment-details-table .icon-minus': 'collapseAssessmentRow'
    };

    DetailsTab.prototype.expandAssessmentRow = function(event) {
      var detailsRow, row;
      row = $(event.target).closest('tr');
      detailsRow = $("#" + (row.attr('id')) + "-details");
      detailsRow.show();
      $(event.target).addClass('hide');
      return row.find('.icon-minus').removeClass('hide');
    };

    DetailsTab.prototype.collapseAssessmentRow = function(event) {
      var detailsRow, row;
      row = $(event.target).closest('tr');
      detailsRow = $("#" + (row.attr('id')) + "-details");
      detailsRow.hide();
      $(event.target).addClass('hide');
      return row.find('.icon-plus').removeClass('hide');
    };

    DetailsTab.prototype.renderCohorts = function(attrs) {
      var content;
      content = [];
      content.push("<h4>Cohorts</h4>");
      if ((attrs.cohorts != null) && attrs.cohorts.length) {
        content.push("" + (Templates.cohortVariantDetailList(attrs.cohorts)));
      } else {
        content.push('<p class=muted>No cohorts</p>');
      }
      return content.join('');
    };

    DetailsTab.prototype.renderPredictions = function(attrs) {
      var content, labelClass, pp2, sift;
      content = [];
      content.push('<h4>Prediction Scores</h4>');
      content.push('<ul class=unstyled>');
      if ((sift = attrs.sift[0])) {
        labelClass = '';
        switch (sift.prediction) {
          case 'Damaging':
            labelClass = 'text-error';
            break;
          default:
            labelClass = 'muted';
        }
        content.push("<li><small>SIFT</small> <span class=" + labelClass + ">" + sift.prediction + "</span></li>");
      }
      if ((pp2 = attrs.polyphen2[0])) {
        labelClass = '';
        switch (pp2.prediction) {
          case 'Probably Damaging':
            labelClass = 'text-error';
            break;
          case 'Possibly Damaging':
            labelClass = 'text-warning';
            break;
          default:
            labelClass = 'muted';
        }
        content.push("<li><small>PolyPhen2</small> <span class=" + labelClass + ">" + pp2.prediction + "</span></li>");
      }
      content.push('</ul>');
      if (!(sift || pp2)) {
        content.push('<p class=muted>No predictions scores</p>');
      }
      return content.join('');
    };

    DetailsTab.prototype.renderSummary = function(result_attrs, variant_attrs) {
      var bases, content, hgmdLinks, key, labelClass, value, _ref;
      content = [];
      content.push("<h4>" + result_attrs.sample.label + " <small>in " + result_attrs.sample.project + "</small></h4>");
      content.push('<ul class=unstyled>');
      content.push("<li><small>Variant Result ID </small>" + result_attrs.id + "</li>");
      labelClass = utils.depthClass(result_attrs.read_depth);
      content.push("<li><small>Coverage</small> <span class=" + labelClass + ">" + result_attrs.read_depth + "x</span> <span class=muted>(<span title=Ref>" + result_attrs.read_depth_ref + "</span>/<span title=Alt>" + result_attrs.read_depth_alt + "</span>)</span> </li>");
      content.push("<li><small>Raw Coverage</small> ");
      if (result_attrs.raw_read_depth != null) {
        content.push("" + result_attrs.raw_read_depth + "x");
      } else {
        content.push('<span class=muted>n/a</span>');
      }
      content.push('</li>');
      labelClass = utils.qualityClass(result_attrs.quality);
      content.push("<li><small>Quality</small> <span class=" + labelClass + ">" + result_attrs.quality + "</span> </li>");
      content.push("<li style=word-wrap:break-word><small>Genotype</small> " + result_attrs.genotype_value + " <small>(" + result_attrs.genotype_description + ")</small></li>");
      content.push("<li><small>Base Counts</small> ");
      if (result_attrs.base_counts) {
        bases = [];
        _ref = result_attrs.base_counts;
        for (key in _ref) {
          value = _ref[key];
          bases.push("" + key + "=" + value);
        }
        content.push(bases.sort().join(', '));
      } else {
        content.push('<span class=muted>n/a</span>');
      }
      content.push('</li>');
      content.push("<li><small>Position</small> " + (Templates.genomicPosition(variant_attrs.chr, variant_attrs.pos)) + "</li>");
      content.push("<li><small>Genes</small> " + (Templates.geneLinks(variant_attrs.uniqueGenes)) + "</li>");
      hgmdLinks = Templates.hgmdLinks(variant_attrs.phenotypes);
      if (hgmdLinks) {
        content.push("<li><small>HGMD IDs</small> " + hgmdLinks + "</li>");
      }
      if (variant_attrs.rsid) {
        content.push("<li><small>dbSNP</small> " + (Templates.dbSNPLink(variant_attrs.rsid)) + "</li>");
      }
      content.push('</ul>');
      content.push("<a href='http://localhost:10000/show?request=chr" + variant_attrs.chr + ":g." + variant_attrs.pos + variant_attrs.ref + ">" + variant_attrs.alt + "' target=_blank class='btn btn-primary btn-small alamut-button'>Query Alamut</a>");
      return content.join('');
    };

    DetailsTab.prototype.renderFrequencies = function(attrs) {
      var content, evs, tg;
      content = [];
      content.push('<h4>1000 Genomes</h4>');
      if ((tg = attrs['1000g'][0])) {
        content.push('<ul class=unstyled>');
        if (tg.all_af != null) {
          content.push("<li><small>All</small> " + (Numbers.prettyNumber(tg.all_af * 100)) + "%</li>");
        }
        if (tg.amr_af != null) {
          content.push("<li><small>American</small> " + (Numbers.prettyNumber(tg.amr_af * 100)) + "%</li>");
        }
        if (tg.afr_af != null) {
          content.push("<li><small>African</small> " + (Numbers.prettyNumber(tg.afr_af * 100)) + "%</li>");
        }
        if (tg.eur_af != null) {
          content.push("<li><small>European</small> " + (Numbers.prettyNumber(tg.eur_af * 100)) + "%</li>");
        }
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No 1000G frequencies</p>');
      }
      content.push('<h4 title="Exome Variant Server">EVS</h4>');
      if ((evs = attrs.evs[0])) {
        content.push('<ul class=unstyled>');
        if (evs.all_af != null) {
          content.push("<li><small>All</small> " + (Numbers.prettyNumber(evs.all_af * 100)) + "%</li>");
        }
        if (evs.afr_af != null) {
          content.push("<li><small>African</small> " + (Numbers.prettyNumber(evs.afr_af * 100)) + "%</li>");
        }
        if (evs.eur_af != null) {
          content.push("<li><small>European</small> " + (Numbers.prettyNumber(evs.eur_af * 100)) + "%</li>");
        }
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No EVS frequencies</p>');
      }
      return content.join('');
    };

    DetailsTab.prototype.renderEffects = function(attrs) {
      var content, eff, effs, gene, labelClass, type, valid, _i, _len, _ref;
      content = [];
      content.push('<h4>Effects</h4>');
      valid = false;
      _.each(attrs.effects, function(eff) {
        if (eff.transcript != null) {
          return valid = true;
        }
      });
      if (valid) {
        content.push('<ul class=unstyled>');
        _ref = _.groupBy(attrs.effects, 'type');
        for (type in _ref) {
          effs = _ref[type];
          content.push('<li>');
          labelClass = utils.priorityClass(utils.effectImpactPriority(effs[0].impact));
          content.push("<span class=" + labelClass + ">" + type + "</span>");
          content.push('<ul>');
          for (_i = 0, _len = effs.length; _i < _len; _i++) {
            eff = effs[_i];
            content.push('<li>');
            content.push("<small><a href=\"http://www.ncbi.nlm.nih.gov/nuccore/" + eff.transcript.transcript + "\">" + eff.transcript.transcript + "</a></small> ");
            if (attrs.uniqueGenes.length > 1 && (gene = eff.transcript.gene)) {
              content.push("<small>for <a target=_blank href=\"http://www.genenames.org/data/hgnc_data.php?hgnc_id=" + gene.hgnc_id + "\">" + gene.symbol + "</a></small> ");
            }
            content.push('<ul><li>');
            if (eff.hgvs_c) {
              content.push("" + eff.hgvs_c + " ");
            }
            if (eff.segment) {
              content.push("" + eff.segment + " ");
            }
            content.push('</li>');
            if (eff.hgvs_p || eff.amino_acid_change) {
              content.push("<li>" + (eff.hgvs_p || eff.amino_acid_change) + "</li>");
            }
            content.push('</ul>');
          }
          content.push('</li></ul>');
        }
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No SNPEff effects known</p>');
      }
      return content.join('');
    };

    DetailsTab.prototype._renderPhenotypeCollection = function(phenotypes) {
      var content, phenotype, sorted, zpad, _i, _len;
      content = [];
      sorted = _.sortBy(phenotypes, function(item) {
        return item.term;
      });
      content.push('<ul>');
      for (_i = 0, _len = sorted.length; _i < _len; _i++) {
        phenotype = sorted[_i];
        content.push("<li>" + phenotype.term);
        if (phenotype.hpo_id || phenotype.hgmd_id) {
          if (phenotype.hgmd_id) {
            content.push(" (HGMD: " + phenotype.hgmd_id + ")");
          }
          if (phenotype.hpo_id) {
            zpad = String("0000000" + phenotype.hpo_id).slice(-7);
            content.push(" (<a href=\"http://www.human-phenotype-ontology.org/hpoweb/showterm?id=HP_" + zpad + "\">HPO: " + zpad + "</a>)");
          }
        }
        content.push('</li>');
      }
      content.push('</ul>');
      return content;
    };

    DetailsTab.prototype.renderPhenotypes = function(attrs) {
      var content;
      content = [];
      content.push('<h4>Phenotypes</h4>');
      if (attrs.phenotypes[0]) {
        content.push('<ul class=unstyled>');
        content.push('<li>Variant:</li>');
        content = content.concat(this._renderPhenotypeCollection(attrs.phenotypes));
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No associated variant phenotypes</p>');
      }
      if (attrs.uniqueGenes[0]) {
        content.push('<ul class=unstyled>');
        _.each(attrs.uniqueGenes, function(gene) {
          content.push("<li>" + gene.symbol + ":</li>");
          if (gene.phenotypes[0]) {
            return content = content.concat(this._renderPhenotypeCollection(gene.phenotypes));
          } else {
            return content.push('<p class=muted>No phenotypes for this gene</p>');
          }
        }, this);
        content.push('</ul>');
      }
      return content.join('');
    };

    DetailsTab.prototype._renderClinVarCollection = function(assertions) {
      var assertion, content, _i, _len;
      content = [];
      for (_i = 0, _len = assertions.length; _i < _len; _i++) {
        assertion = assertions[_i];
        content.push("<li>Assertion: <a target=\"_blank\" href=\"https://www.ncbi.nlm.nih.gov/clinvar/" + assertion.rcvaccession + "/\">" + assertion.rcvaccession + "</a>");
        content.push('<ul>');
        content.push("<li><small>Siginificance</small> <b>" + assertion.clinicalsignificance + "</b></li>");
        content.push("<li><small>Origin</small> " + assertion.origin + "</li>");
        content.push("<li><small>Type</small> " + assertion.type + "</li>");
        content.push("<li><small># Submitters</small> " + assertion.numbersubmitters + "</li>");
        content.push("<li><small>Review Status</small> " + assertion.reviewstatus + "</li>");
        content.push("<li><small>Last Evaluated</small> " + assertion.lastevaluated + "</li>");
        content.push('</ul>');
        content.push('</li>');
      }
      return content;
    };

    DetailsTab.prototype.renderClinvar = function(attrs) {
      var content;
      content = [];
      content.push('<h4>ClinVar</h4>');
      if (attrs.solvebio.clinvar[0]) {
        content.push('<ul class=unstyled>');
        content = content.concat(this._renderClinVarCollection(attrs.solvebio.clinvar));
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No ClinVar assertions</p>');
      }
      return content.join('');
    };

    DetailsTab.prototype._renderArticleCollection = function(articles) {
      var content, pmid, sorted, _i, _len;
      content = [];
      sorted = _.sortBy(articles, function(item) {
        return item;
      });
      content.push('<ul>');
      for (_i = 0, _len = sorted.length; _i < _len; _i++) {
        pmid = sorted[_i];
        content.push("<li><a href=\"http://www.ncbi.nlm.nih.gov/pubmed/" + pmid + "\">" + pmid + "</a></li>");
      }
      content.push('</ul>');
      return content;
    };

    DetailsTab.prototype.renderPubmed = function(attrs) {
      var content;
      content = [];
      content.push('<h4>Articles</h4>');
      if (attrs.articles[0]) {
        content.push('<ul class=unstyled>');
        content.push('<li>Variant:</li>');
        content = content.concat(this._renderArticleCollection(attrs.articles));
        content.push('</ul>');
      } else {
        content.push('<p class=muted>No PubMed articles for this variant</p>');
      }
      if (attrs.uniqueGenes[0]) {
        content.push('<ul class=unstyled>');
        _.each(attrs.uniqueGenes, function(gene) {
          content.push("<li>" + gene.symbol + ":</li>");
          if (gene.articles[0]) {
            return content = content.concat(this._renderArticleCollection(gene.articles));
          } else {
            return content.push('<p class=muted>No PubMed articles for this gene</p>');
          }
        }, this);
        content.push('</ul>');
      }
      return content.join('');
    };

    DetailsTab.prototype.fetchMetricsError = function() {
      return $('#assessment-metrics').html('<p class=text-error>Error loading metrics.</p>');
    };

    DetailsTab.prototype.fetchMetricsSuccess = function() {
      var content, metrics;
      $('#assessment-metrics').html('');
      if (_.isEmpty(this.metrics.get('metrics'))) {
        return $('#assessment-metrics').html('<p class=muted>No assessments have been made on this variant</p>');
      } else {
        metrics = this.metrics.get('metrics');
        content = [];
        content.push('<div class=row-fluid>');
        content.push('<div class=span4>');
        content.push("<strong>Pathogenicities</strong>" + (Templates.assessmentMetrics(metrics.pathogenicities, true)));
        content.push('</div>');
        content.push('<div class=span4>');
        content.push("<strong>Categories</strong>" + (Templates.assessmentMetrics(metrics.categories, true)));
        content.push('</div>');
        content.push('</div>');
        content.push('<div class=row-fluid>');
        content.push('<table class=assessment-details-table>');
        content.push('<thead><tr><th></th><th>Sample</th><th>User</th><th>Pathogenicity</th><th>Category</th><th>Mother</th><th>Father</th><th>Sanger Requested</th></tr></thead>');
        content.push("<tbody>" + (Templates.assessmentRows(metrics.assessments)) + "</tbody>");
        content.push('</table>');
        content.push('</div>');
        $('#assessment-metrics').append(content.join(' '));
        return $('.username-popover').popover();
      }
    };

    DetailsTab.prototype.renderAssessmentMetricsContainer = function() {
      var content;
      content = [];
      content.push('<h4>Assessments</h4>');
      content.push("<div id=assessment-metrics><img src='" + (utils.toAbsolutePath('static/images/loader-tiny.gif')) + "' /></div>");
      return content.join('');
    };

    DetailsTab.prototype._renderExpandCollapse = function() {
      var content;
      content = [];
      content.push('<div class=expand-collapse-container>');
      content.push('<a href="#" data-target=expand-collapse-link>MORE</a>');
      content.push('</div>');
      return content.join('');
    };

    DetailsTab.prototype._span = function(html, size) {
      if (size == null) {
        size = 12;
      }
      return $("<div class=\"span" + size + "\" />").html(html);
    };

    DetailsTab.prototype.render = function() {
      var $row1, $row2, $row3, attrs;
      attrs = this.model.get('variant');
      $row1 = $('<div class=row-fluid data-target=expandable-details-row />');
      $row2 = $('<div class=row-fluid data-target=expandable-details-row />');
      $row3 = $('<div class="row-fluid  assessments-table-container" />');
      $row1.append(this._span(this.renderSummary(this.model.attributes, attrs), 3));
      $row1.append(this._span(this.renderEffects(attrs), 3).addClass('expandable-details-item').append(this._renderExpandCollapse));
      $row1.append(this._span(this.renderPhenotypes(attrs) + this.renderClinvar(attrs), 3).addClass('expandable-details-item').append(this._renderExpandCollapse));
      $row1.append(this._span(this.renderPredictions(attrs), 3));
      $row2.append(this._span(this.renderCohorts(attrs), 3));
      $row2.append(this._span(this.renderFrequencies(attrs), 3));
      $row2.append(this._span(this.renderPubmed(attrs), 3).addClass('expandable-details-item').append(this._renderExpandCollapse));
      $row3.append(this._span(this.renderAssessmentMetricsContainer(), 12));
      this.$content.append($row1, $row2, $row3);
      this.$el.find('.cohort-sample-popover').popover();
      this.metrics.fetch({
        success: this.fetchMetricsSuccess,
        error: this.fetchMetricsError
      });
      return this.$el;
    };

    return DetailsTab;

  })(Marionette.ItemView);
  AssessmentTab = (function(_super) {
    __extends(AssessmentTab, _super);

    function AssessmentTab() {
      this.onAssessmentFetchSuccess = __bind(this.onAssessmentFetchSuccess, this);
      this.onAssessmentFetchError = __bind(this.onAssessmentFetchError, this);
      return AssessmentTab.__super__.constructor.apply(this, arguments);
    }

    AssessmentTab.prototype.template = function() {};

    AssessmentTab.prototype.el = '#knowledge-capture-content';

    AssessmentTab.prototype.update = function(model) {
      if (this.model == null) {
        this.formContainer = $('#knowledge-capture-form-container');
        this.feedbackContainer = $('#knowledge-capture-feedback-container');
        this.saveButton = $('#save-assessment-button');
        this.auditButton = $('#audit-trail-button');
        this.errorContainer = $('#error-container');
        this.errorMsg = $('#error-message');
        $('.alert-error > .close').on('click', this.closeFormErrorsClicked);
      }
      this.formContainer.hide();
      this.feedbackContainer.show();
      this.errorContainer.hide();
      this.model = model;
      return this.model.fetch({
        error: this.onAssessmentFetchError,
        success: this.onAssessmentFetchSuccess
      });
    };

    AssessmentTab.prototype.onAssessmentFetchError = function() {
      this.formContainer.hide();
      this.feedbackContainer.hide();
      this.errorContainer.show();
      this.errorMsg.html('<h5 class=text-error>Error retrieving knowledge capture data.</h5>');
      this.saveButton.hide();
      return this.auditButton.hide();
    };

    AssessmentTab.prototype.onAssessmentFetchSuccess = function() {
      this.errorContainer.hide();
      this.feedbackContainer.hide();
      this.formContainer.show();
      return this.render();
    };

    AssessmentTab.prototype.closeFormErrorsClicked = function(event) {
      return $(event.target).parent().hide();
    };

    AssessmentTab.prototype.isValid = function() {
      var valid;
      this.model.set({
        evidence_details: $('#evidence-details').val(),
        sanger_requested: $('input[name=sanger-radio]:checked').val(),
        pathogenicity: $('input[name=pathogenicity-radio]:checked').val(),
        assessment_category: $('input[name=category-radio]:checked').val(),
        mother_result: $('#mother-results').val(),
        father_result: $('#father-results').val()
      });
      valid = true;
      this.errorContainer.hide();
      this.errorMsg.html('');
      if (_.isEmpty(this.model.get('pathogenicity'))) {
        this.errorMsg.append('<h5>Please select a pathogenicity.</h5>');
      }
      if (_.isEmpty(this.model.get('assessment_category'))) {
        this.errorMsg.append('<h5>Please select a category.</h5>');
      }
      if (_.isEmpty(this.model.get('mother_result'))) {
        valid = false;
        this.errorMsg.append('<h5>Please select a result from the &quot;Mother&quot; dropdown.</h5>');
      }
      if (_.isEmpty(this.model.get('father_result'))) {
        valid = false;
        this.errorMsg.append('<h5>Please select a result from the &quot;Father&quot; dropdown.</h5>');
      }
      if (this.model.get('sanger_requested') == null) {
        valid = false;
        this.errorMsg.append('<h5>Please select one of the &quot;Sanger Requested&quot; options.</h5>');
      }
      if (!valid) {
        this.errorContainer.show();
      }
      return valid;
    };

    AssessmentTab.prototype.setRadioChecked = function(name, value) {
      var checkedRadio, radios;
      radios = $('input:radio[name=' + name + ']');
      $(radios.prop('checked', false));
      checkedRadio = $(radios.filter('[value=' + value + ']'));
      $(checkedRadio.prop('checked', true));
      return $(checkedRadio.change());
    };

    AssessmentTab.prototype.render = function() {
      this.setRadioChecked('category-radio', this.model.get('assessment_category'));
      this.setRadioChecked('pathogenicity-radio', this.model.get('pathogenicity'));
      this.setRadioChecked('sanger-radio', this.model.get('sanger_requested'));
      $('#mother-results').val(this.model.get('mother_result'));
      $('#father-results').val(this.model.get('father_result'));
      return $('#evidence-details').val(this.model.get('evidence_details'));
    };

    return AssessmentTab;

  })(Marionette.ItemView);
  ResultDetails = (function(_super) {
    __extends(ResultDetails, _super);

    function ResultDetails() {
      this.toggleExpandedState = __bind(this.toggleExpandedState, this);
      this._checkForOverflow = __bind(this._checkForOverflow, this);
      this.onSaveSuccess = __bind(this.onSaveSuccess, this);
      this.onSaveError = __bind(this.onSaveError, this);
      return ResultDetails.__super__.constructor.apply(this, arguments);
    }

    ResultDetails.prototype.className = 'modal hide';

    ResultDetails.prototype.maxExpandableHeight = 300;

    ResultDetails.prototype.showLessText = 'Show Less...';

    ResultDetails.prototype.showMoreText = 'Show More...';

    ResultDetails.prototype.template = 'varify/modals/result';

    ResultDetails.prototype.ui = {
      variantDetailsTabContent: '#variant-details-content',
      saveButton: '#save-assessment-button',
      auditTrailButton: '#audit-trail-button'
    };

    ResultDetails.prototype.events = {
      'click #close-review-button': 'close',
      'click #save-assessment-button': 'saveAndClose',
      'click #variant-details-link': 'hideButtons',
      'click #knowledge-capture-link': 'showButtons',
      'click [data-target=expand-collapse-link]': 'toggleExpandedState'
    };

    ResultDetails.prototype.initialize = function() {
      return this.assessmentTab = new AssessmentTab;
    };

    ResultDetails.prototype.hideButtons = function() {
      this.ui.saveButton.hide();
      return this.ui.auditTrailButton.hide();
    };

    ResultDetails.prototype.showButtons = function() {
      this.ui.saveButton.show();
      return this.ui.auditTrailButton.show();
    };

    ResultDetails.prototype.saveAndClose = function(event) {
      if (this.assessmentTab.isValid()) {
        this.assessmentTab.model.save(null, {
          success: this.onSaveSuccess,
          error: this.onSaveError
        });
        return this.close();
      }
    };

    ResultDetails.prototype.close = function() {
      return this.$el.modal('hide');
    };

    ResultDetails.prototype.onSaveError = function(model, response) {
      $('#review-notification').html("Error saving knowledge capture data.");
      $('#review-notification').addClass('alert-error');
      return this.showNotification();
    };

    ResultDetails.prototype.onSaveSuccess = function(model, response) {
      $('#review-notification').html("Saved changes.");
      $('#review-notification').addClass('alert-success');
      this.showNotification();
      return this.selectedSummaryView.model.fetch();
    };

    ResultDetails.prototype.showNotification = function() {
      $('#review-notification').show();
      return setTimeout(this.hideNotification, 5000);
    };

    ResultDetails.prototype.hideNotification = function() {
      $('#review-notification').removeClass('alert-error alert-success');
      return $('#review-notification').hide();
    };

    ResultDetails.prototype.onRender = function() {
      return this.$el.modal({
        show: false,
        keyboard: false,
        backdrop: 'static'
      });
    };

    ResultDetails.prototype._checkForOverflow = function() {
      return _.each($('.expandable-details-item'), function(element) {
        var child, hasOverflow, _i, _len, _ref;
        hasOverflow = false;
        _ref = element.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if ((child.offsetTop + child.offsetHeight) > this.maxExpandableHeight) {
            hasOverflow = true;
            break;
          }
        }
        if (hasOverflow) {
          return $(element).find('.expand-collapse-container').show();
        } else {
          return $(element).find('.expand-collapse-container').hide();
        }
      }, this);
    };

    ResultDetails.prototype.toggleExpandedState = function(event) {
      var element, parent;
      element = $(event.target);
      parent = element.closest('[data-target=expandable-details-row]');
      if (element.text() === this.showMoreText) {
        parent.find('[data-target=expand-collapse-link]').text(this.showLessText);
        return parent.css('height', 'auto').css('overflow', 'visible');
      } else {
        parent.find('[data-target=expand-collapse-link]').text(this.showMoreText);
        return parent.css('height', this.maxExpandableHeight).css('overflow', 'hidden');
      }
    };

    ResultDetails.prototype.update = function(summaryView, result) {
      var assessmentModel, metrics;
      this.selectedSummaryView = summaryView;
      this.model = result;
      metrics = new models.AssessmentMetrics({}, {
        variant_id: result.get('variant').id,
        result_id: result.id
      });
      this.detailsTab = new DetailsTab({
        model: result,
        metrics: metrics
      });
      this.ui.variantDetailsTabContent.html(this.detailsTab.render);
      assessmentModel = new models.Assessment({
        sample_result: this.model.id
      });
      if (this.model.get('assessment') != null) {
        assessmentModel.id = this.model.get('assessment').id;
      }
      this.assessmentTab.update(assessmentModel);
      this.$el.modal('show');
      $('[data-target=expandable-details-row]').css('height', "" + this.maxExpandableHeight + "px").css('overflow', 'hidden');
      $('[data-target=expand-collapse-link]').text(this.showMoreText);
      return this._checkForOverflow();
    };

    return ResultDetails;

  })(Marionette.ItemView);
  return {
    ResultDetails: ResultDetails
  };
});
