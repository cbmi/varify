define(["cilantro"],function(e){var t=e.ui.ControlItemView.extend({template:"varify/controls/sift",ui:{select:".sift-selector"},events:{"change .sift-selector":"change"},initialize:function(){this.on("ready",function(){this.change()})},getOperator:function(){return this.ui.select.val()==="damaging"?"lte":"gt"},getValue:function(){return.5},setOperator:function(e){e==="lte"?this.ui.select.val("damaging"):this.ui.select.val("tolerated")}});return{SiftSelector:t}})