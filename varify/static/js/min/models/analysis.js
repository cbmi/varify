define(["backbone","../utils"],function(e,t){var n=e.Model.extend({urlRoot:function(){return t.toAbsolutePath("api/analyses/")}}),r=e.Collection.extend({url:function(){return t.toAbsolutePath("api/analyses/")},model:n}),i=e.Model.extend({urlRoot:function(){return t.toAbsolutePath("api/assessments/")}}),s=e.Collection.extend({url:function(){return t.toAbsolutePath("api/analyses/"+this.get("analysisId")+"/assessments/")}});return{AnalysisModel:n,AnalysisCollection:r,AssessmentModel:i,AssessmentCollection:s}})