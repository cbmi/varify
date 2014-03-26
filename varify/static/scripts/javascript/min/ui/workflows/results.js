define(["underscore","cilantro","cilantro/ui/numbers","../tables"],function(e,t,n,r){var i=t.ui.ResultCount.extend({initialize:function(){this.data={};if(!(this.data.context=this.options.context))throw new Error("context model required")},renderCount:function(t,r,i){var s=[],o;this.data.context&&(o=this.data.context.get("json"))&&e.each(o.children,function(t){t.concept&&t.concept===2&&(s=e.pluck(t.children[0].value,"label"))}),n.renderCount(this.ui.count,r),s.length===1?(this.ui.label.text("records in "+s[0]),this.ui.label.attr("title",s[0]),this.ui.label.tooltip({animation:!1,html:!0,placement:"bottom",container:"body"})):(this.ui.label.text("records in various samples"),this.ui.label.attr("title","various samples"),this.ui.label.tooltip("destroy"))}}),s=t.ui.ResultsWorkflow.extend({template:"varify/workflows/results",_events:{"click .export-options-modal [data-save]":"onExportClicked","click .export-options-modal [data-dismiss=modal]":"onExportCloseClicked","click [data-toggle=phenotype-dialog]":"showPhenotypesModal"},initialize:function(){this.events=e.extend({},this._events,this.events),t.on("resultRow:click",function(e,n){t.dialogs.resultDetails.open(e,n)}),t.ui.ResultsWorkflow.prototype.initialize.call(this);if(!(this.data.context=this.options.context))throw new Error("context model required")},showPhenotypesModal:function(){t.dialogs.phenotype.open()},onExportCloseClicked:function(){e.delay(function(){this.columns.currentView.resetFacets()},25)},onExportClicked:function(){this.columns.currentView.data.facets.length===0?(this.$("#export-error-message").html("One or more columns must be selected. Click the &quot;Columns&quot; tab, add at least one column using the green &quot;plus&quot; buttons next to the column names, and click &quot;Export&quot; to try again."),this.$(".export-options-modal .alert-block").show()):e.isEqual(e.pluck(this.data.view.facets.models,"id"),e.pluck(this.columns.currentView.data.facets.models,"id"))?this.exportData():(this.data.view.facets.reset(this.columns.currentView.data.facets.toJSON()),this.data.view.save({},{success:this.exportData}))},onRender:function(){$(document).on("scroll",this.onPageScroll),t.isSupported("2.1.0")||(this.ui.saveQueryToggle.remove(),this.ui.saveQuery.remove()),this.paginator.show(new t.ui.Paginator({model:this.data.results})),this.count.show(new i({model:this.data.results,context:this.data.context})),this.exportTypes.show(new t.ui.ExportTypeCollection({collection:this.data.exporters})),this.exportProgress.show(new t.ui.ExportProgressCollection({collection:this.data.exporters})),this.table.show(new r.ResultTable({view:this.data.view,collection:this.data.results})),this.ui.navbarButtons.tooltip({animation:!1,placement:"bottom"})}});return{ResultsWorkflow:s}})