var __hasProp={}.hasOwnProperty,__extends=function(t,e){function n(){this.constructor=t}for(var i in e)__hasProp.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};define(["underscore","backbone","../core","./base","./stats"],function(t,e,n,i,s){var o,r,a,h;return a=function(t){var e;return(e=n.config.get("fields.instances."+t.id+".type"))?e:null!=t.logical_type?t.logical_type:(e=t.simple_type,t.enumerable||"boolean"===e?"choice":e)},r=function(t){function n(){var t=this;n.__super__.constructor.apply(this,arguments),this.links.stats&&(this.stats=new s.StatCollection,this.stats.url=function(){return t.links.stats})}return __extends(n,t),n.prototype.parse=function(){var t;return this._cache={},t=n.__super__.parse.apply(this,arguments),t.logical_type=a(t),t},n.prototype.distribution=function(t,n){var i=this;null==n&&(n=!0),null==this.links.distribution&&t(),n&&null!=this._cache.distribution?t(this._cache.distribution):e.ajax({url:this.links.distribution,dataType:"json",success:function(e){return i._cache.distribution=n?e:null,t(e)}})},n.prototype.values=function(t,n,i){var s,o=this;return null==i&&(i=!0),"function"==typeof t?(n=t,i=n,t={}):t&&(i=!1,"string"==typeof t&&(t={query:t})),null==this.links.values&&n(),s=e.$.Deferred(),n&&s.done(n),i&&null!=this._cache.values?s.resolve(this._cache.values):e.ajax({url:this.links.values,data:t,dataType:"json",success:function(t){return i&&(o._cache.values=t),s.resolve(t)},error:function(){return s.reject()}}),s.promise()},n}(i.Model),o=function(n){function i(){return h=i.__super__.constructor.apply(this,arguments)}return __extends(i,n),i.prototype.model=r,i.prototype.search=function(n,i){return e.ajax({url:t.result(this,"url"),data:{query:n},dataType:"json",success:function(t){return i(t)}})},i}(i.Collection),{FieldModel:r,FieldCollection:o}});
//@ sourceMappingURL=field.js.map