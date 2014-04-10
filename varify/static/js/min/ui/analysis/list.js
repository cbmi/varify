define(["underscore","marionette","./item"],function(e,t,n){var r=t.CompositeView.extend({itemView:n.AnalysisItem,itemViewContainer:".items",template:"varify/analysis/list",ui:{empty:".empty-message",error:".error-message",loading:".loading-indicator"},collectionEvents:{sync:"onCollectionSync",error:"onCollectionError",request:"onCollectionRequest"},onCollectionError:function(){this.ui.empty.hide(),this.ui.error.show(),this.ui.loading.hide()},onCollectionRequest:function(){this.ui.empty.hide(),this.ui.error.hide(),this.ui.loading.show()},onCollectionSync:function(){this.ui.error.hide(),this.ui.loading.hide(),this.checkForEmptyCollection()},initialize:function(){e.bindAll(this,"onCollectionError","onCollectionRequest","onCollectionSync"),this.collection.fetch()},checkForEmptyCollection:function(){this.collection.length===0?this.ui.empty.show():this.ui.empty.hide()},onRender:function(){this.checkForEmptyCollection()}}),i=t.CompositeView.extend({itemView:n.AssessmentItem,itemViewContainer:".items",template:"varify/analysis/assessment-list",ui:{empty:".empty-message",error:".error-message",initial:".initial-message",loading:".loading-indicator"},collectionEvents:{sync:"onCollectionSync",error:"onCollectionError",request:"onCollectionRequest"},onCollectionError:function(){this.ui.empty.hide(),this.ui.error.show(),this.ui.initial.hide(),this.ui.loading.hide()},onCollectionRequest:function(){this.ui.empty.hide(),this.ui.error.hide(),this.ui.initial.hide(),this.ui.loading.show()},onCollectionSync:function(){this.ui.error.hide(),this.ui.loading.hide(),this.checkForEmptyCollection()},initialize:function(){e.bindAll(this,"onCollectionError","onCollectionRequest","onCollectionSync")},checkForEmptyCollection:function(){this.collection.length===0?this.ui.empty.show():this.ui.empty.hide()}});return{AnalysisList:r,AssessmentList:i}})