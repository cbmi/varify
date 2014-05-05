define(["jquery","underscore","backbone","marionette","../../utils","../variant"],function(e,t,n,r,i,s){var o=r.Layout.extend({id:"result-details-modal",className:"modal hide",maxExpandableHeight:300,showLessText:"Show Less...",showMoreText:"Show More...",template:"varify/modals/result",ui:{expandableRows:"[data-target=expandable-row]"},selectors:{expandableItem:".expandable-item",expandCollapseLink:"[data-target=expand-collapse-link]",linkContainer:".expand-collapse-container"},regions:{summary:"[data-target=summary]",effects:"[data-target=effects]",phenotypes:"[data-target=phenotypes]",scores:"[data-target=prediction-scores]",cohorts:"[data-target=cohorts]",frequencies:"[data-target=frequencies]",articles:"[data-target=articles]",clinvar:"[data-target=clinvar]",assessmentMetrics:"[data-target=assessment-metrics]"},events:{"click [data-action=close-result-modal]":"close","click [data-target=expand-collapse-link]":"toggleExpandedState"},close:function(){this.$el.modal("hide")},onRender:function(){this.$el.modal({show:!1,keyboard:!1,backdrop:"static"})},_checkForOverflow:function(){t.each(e(this.selectors.expandableItem),function(t){var n,r=!1;for(var i=0;i<t.children.length;i++){n=t.children[i];if(n.offsetTop+n.offsetHeight>this.maxExpandableHeight){r=!0;break}}r?e(t).find(this.selectors.linkContainer).show():e(t).find(this.selectors.linkContainer).hide()},this)},toggleExpandedState:function(t){var n,r;n=e(t.target),r=n.closest(this.ui.expandableRows),n.text()===this.showMoreText?(r.find(this.selectors.expandCollapseLink).text(this.showLessText),r.css("height","auto").css("overflow","visible")):(r.find(this.selectors.expandCollapseLink).text(this.showMoreText),r.css("height",this.maxExpandableHeight).css("overflow","hidden"))},open:function(e){this.model=e,this.summary.show(new s.Summary({model:this.model})),this.effects.show(new s.Effects({collection:new n.Collection(i.groupEffectsByType(t.filter(this.model.get("variant").effects,function(e){return e.transcript!==null})))})),this.phenotypes.show(new s.Phenotypes({collection:new n.Collection(i.groupPhenotypesByType(this.model.get("variant")))})),this.scores.show(new s.PredictionScores({model:new n.Model(this.model.get("variant"))})),this.cohorts.show(new s.Cohorts({collection:new n.Collection(this.model.get("variant").cohorts)})),this.frequencies.show(new s.Frequencies({model:new n.Model(this.model.get("variant"))})),this.articles.show(new s.Articles({collection:new n.Collection(i.groupArticlesByType(this.model.get("variant")))}));var r;this.model.get("solvebio")&&this.model.get("solvebio").clinvar&&(r=this.model.get("solvebio").clinvar.results),r=r||[],this.clinvar.show(new s.Clinvar({collection:new n.Collection(r)}));var o=new s.AssessmentMetrics({variantId:this.model.get("variant").id});this.assessmentMetrics.show(o),this.$el.modal("show"),this.$el.find(this.ui.expandableRows).css("height",""+this.maxExpandableHeight+"px").css("overflow","hidden"),this.$el.find(this.selectors.expandCollapseLink).text(this.showMoreText),this._checkForOverflow()}});return{ResultDetails:o}})