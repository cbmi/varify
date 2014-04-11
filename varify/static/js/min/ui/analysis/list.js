define(["underscore","cilantro","backbone","marionette","./item"],function(e,t,n,r,i){var s=r.CompositeView.extend({itemView:i.AnalysisItem,itemViewContainer:".items",template:"varify/analysis/list",ui:{empty:".empty-message",error:".error-message",loading:".loading-indicator",items:".items"},collectionEvents:{sync:"onCollectionSync",error:"onCollectionError",request:"onCollectionRequest"},onCollectionError:function(){this.ui.empty.hide(),this.ui.error.show(),this.ui.loading.hide()},onCollectionRequest:function(){this.ui.empty.hide(),this.ui.error.hide(),this.ui.loading.show()},onCollectionSync:function(){this.ui.error.hide(),this.ui.loading.hide(),this.checkForEmptyCollection()},initialize:function(){e.bindAll(this,"onCollectionError","onCollectionRequest","onCollectionSync","onAnalysisItemClick"),t.on("analysis:item:click",this.onAnalysisItemClick),this.collection.fetch()},checkForEmptyCollection:function(){this.collection.length===0?this.ui.empty.show():this.ui.empty.hide()},onRender:function(){this.checkForEmptyCollection()},onAnalysisItemClick:function(e,t){this.ui.items.children().removeClass("selected"),e.$el.addClass("selected")}}),o=r.CompositeView.extend({itemView:i.AssessmentItem,itemViewContainer:".items",template:"varify/analysis/assessment-list",modelEvents:{sync:"render"},initialize:function(){this.collection=new n.Collection(this.model.get("assessments"))}}),u=t.ui.AccordianSection.extend({itemView:o,template:"varify/analysis/result-list",itemViewContainer:".items",initialize:function(){this.collection=new n.Collection(this.model.get("results"))}}),a=t.ui.AccordianGroup.extend({itemView:u,template:"varify/analysis/category-list",itemViewContainer:".items",initialize:function(){t.ui.AccordianGroup.prototype.initialize(),this.collection=new n.Collection(this.model.get("categories"))}}),f=r.CompositeView.extend({itemView:a,itemViewContainer:".items",template:"varify/analysis/pathogenicity-list",ui:{empty:".empty-message",error:".error-message",initial:".initial-message",loading:".loading-indicator",items:".items"},collectionEvents:{sync:"onCollectionSync",error:"onCollectionError",request:"onCollectionRequest"},onCollectionError:function(){this.ui.empty.hide(),this.ui.error.show(),this.ui.initial.hide(),this.ui.loading.hide()},onCollectionRequest:function(){this.ui.empty.hide(),this.ui.error.hide(),this.ui.initial.hide(),this.ui.items.hide(),this.ui.loading.show()},onCollectionSync:function(){this.ui.error.hide(),this.ui.loading.hide(),this.checkForEmptyCollection()},initialize:function(){e.bindAll(this,"onCollectionError","onCollectionRequest","onCollectionSync","onAnalysisItemClick"),t.on("analysis:item:click",this.onAnalysisItemClick)},checkForEmptyCollection:function(){this.collection.length===0?this.ui.empty.show():(this.ui.items.show(),this.ui.empty.hide())},onAnalysisItemClick:function(e,t){if(this.model&&this.model.id===t.id)return;this.model=t,this.render(),this.collection.analysisId=this.model.id,this.collection.fetch({reset:!0})}});return{AnalysisList:s,PathogenictyList:f}})