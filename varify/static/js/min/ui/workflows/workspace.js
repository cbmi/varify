define(["underscore","cilantro","marionette","../sample","../../utils"],function(e,t,n,r,i){var s=t.ui.WorkspaceWorkflow.extend({template:"varify/workflows/workspace",ui:function(){return e.extend({sampleVariantSetHelp:"[data-target=sample-variant-set-help]",createVariantSetButton:"[data-target=create-variant-set]"},t.ui.WorkspaceWorkflow.prototype.ui)},events:{"click @ui.createVariantSetButton":"onCreateVariantSetClicked"},regions:{queries:"[data-target=query-region]",publicQueries:"[data-target=public-query-region]",sampleDetail:"[data-target=sample-details-region]",sampleVariantSets:"[data-target=sample-variant-sets-region]"},regionViews:{queries:t.ui.QueryList,publicQueries:t.ui.QueryList,sampleDetail:r.SampleDetail,sampleVariantSets:r.SampleVariantSets},initialize:function(e){t.ui.WorkspaceWorkflow.prototype.initialize.call(this,e);if(!(this.data.samples=this.options.samples))throw new Error("samples collection required")},onCreateVariantSetClicked:function(){t.dialogs.variantSet.open(this.sample)},onRender:function(){t.ui.WorkspaceWorkflow.prototype.onRender.call(this),this.ui.sampleVariantSetHelp.tooltip({title:"A variant set is a fixed set of sample variants that can be annotated and augmented at the creator's discretion."}),this.listenTo(this.data.samples,"select",this.onSampleSelected);if(this.sample===undefined){var e=i.sampleIdsInContext(this.data.context);e.length>0&&(this.sample=this.data.samples.get(e[0]))}this.renderSampleDetail(),this.renderSampleVariantSets()},onSampleSelected:function(e){this.sample=e,this.renderSampleDetail(),this.renderSampleVariantSets()},renderSampleDetail:function(){var e=new this.regionViews.sampleDetail({model:this.sample});this.sampleDetail.show(e)},renderSampleVariantSets:function(){if(!this.sample)return;var e=new this.regionViews.sampleVariantSets({collection:this.sample.variantSets});this.sample.variantSets.fetch({reset:!0}),this.sampleVariantSets.show(e)}});return{WorkspaceWorkflow:s}})