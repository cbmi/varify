define(["underscore","cilantro","backbone","marionette"],function(e,t,n,r){var i=t.ui.EmptyView.extend({className:"muted",icon:"",align:"left"}),s=i.extend({message:"No associated variant phenotypes"}),o=i.extend({message:"No phenotypes for this gene"}),u=r.ItemView.extend({template:"varify/variant/phenotype-item",tagName:"li",serializeData:function(){var e=r.ItemView.prototype.serializeData.apply(this,arguments);return e.hpo_id&&(e.hpo_id=String("0000000"+e.hpo_id).slice(-7)),e}}),a=r.CompositeView.extend({template:"varify/variant/phenotype-group",tagName:"ul",className:"unstyled",itemView:u,itemViewContainer:"[data-target=items]",getEmptyView:function(){return this.model.get("type")==="variant"?s:o}}),f=r.CompositeView.extend({template:"varify/variant/phenotypes",itemView:a,itemViewOptions:function(t){return{collection:new n.Collection(e.sortBy(t.get("phenotypes"),function(e){return e.term}))}},itemViewContainer:"[data-target=items]"});return{Phenotypes:f}})