define(["jquery","underscore","marionette","cilantro","../../models","../../utils","../../templates"],function(e,t,n,r,i,s,o){var u=n.ItemView.extend({template:function(){},initialize:function(){t.bindAll(this,"fetchMetricsError","fetchMetricsSuccess"),this.metrics=this.options.metrics,this.$content=e("<div class=content>"),this.$el.append(this.$content),this.$el.attr("id","variant-details-content")},events:{"click .cohort-sample-popover":"hidePopover","click .assessment-details-table .icon-plus":"expandAssessmentRow","click .assessment-details-table .icon-minus":"collapseAssessmentRow"},hidePopover:function(t){e(".cohort-sample-popover").not(t.target).popover("hide")},expandAssessmentRow:function(t){var n=e(t.target).closest("tr"),r=e("#"+n.attr("id")+"-details");r.show(),e(t.target).addClass("hide"),n.find(".icon-minus").removeClass("hide")},collapseAssessmentRow:function(t){var n=e(t.target).closest("tr"),r=e("#"+n.attr("id")+"-details");r.hide(),e(t.target).addClass("hide"),n.find(".icon-plus").removeClass("hide")},renderCohorts:function(e){var t=[];return t.push("<h4>Cohorts</h4>"),e.cohorts!=null&&e.cohorts.length?t.push(""+o.cohortVariantDetailList(e.cohorts)):t.push("<p class=muted>No cohorts</p>"),t.join("")},renderPredictions:function(e){var t,n,r,i;t=[],t.push("<h4>Prediction Scores</h4>"),t.push("<ul class=unstyled>");if(i=e.sift[0]){n="";switch(i.prediction){case"Damaging":n="text-error";break;default:n="muted"}t.push("<li><small>SIFT</small> <span class="+n+">"+i.prediction+"</span></li>")}if(r=e.polyphen2[0]){n="";switch(r.prediction){case"Probably Damaging":n="text-error";break;case"Possibly Damaging":n="text-warning";break;default:n="muted"}t.push("<li><small>PolyPhen2</small> <span class="+n+">"+r.prediction+"</span></li>")}return t.push("</ul>"),!i&&!r&&t.push("<p class=muted>No predictions scores</p>"),t.join("")},renderSummary:function(e,t){var n,r,i,u,a;r=[],r.push("<h4>"+e.sample.label+" <small>in "+e.sample.project+"</small></h4>"),r.push("<ul class=unstyled>"),r.push("<li><small>Variant Result ID </small>"+e.id+"</li>"),a=s.depthClass(e.read_depth),r.push("<li><small>Coverage</small> <span class="+a+">"+e.read_depth+"x</span> <span class=muted>(<span title=Ref>"+e.read_depth_ref+"</span>/<span title=Alt>"+e.read_depth_alt+"</span>)</span> </li>"),r.push("<li><small>Raw Coverage</small> "),e.raw_read_depth!=null?r.push(""+e.raw_read_depth+"x"):r.push("<span class=muted>n/a</span>"),r.push("</li>"),a=s.qualityClass(e.quality),r.push("<li><small>Quality</small> <span class="+a+">"+e.quality+"</span> </li>"),r.push("<li style=word-wrap:break-word><small>Genotype</small> "+e.genotype_value+" <small>("+e.genotype_description+")</small></li>"),r.push("<li><small>Base Counts</small> ");if(e.base_counts){n=[];for(u in e.base_counts)n.push(""+u+"="+e.base_counts[u]);r.push(n.sort().join(", "))}else r.push("<span class=muted>n/a</span>");return r.push("</li>"),r.push("<li><small>Position</small> "+o.genomicPosition(t.chr,t.pos)+"</li>"),r.push("<li><small>Genes</small> "+o.geneLinks(t.uniqueGenes)+"</li>"),i=o.hgmdLinks(t.phenotypes),i&&r.push("<li><small>HGMD IDs</small> "+i+"</li>"),t.rsid&&r.push("<li><small>dbSNP</small> "+o.dbSNPLink(t.rsid)+"</li>"),r.push("</ul>"),r.push('<a href="http://localhost:10000/show?request=chr'+t.chr+":g."+t.pos+t.ref+">"+t.alt+'" target=_blank class="btn btn-primary btn-small alamut-button">Query Alamut</a>'),r.join("")},renderFrequencies:function(e){var t,n,i;return t=[],t.push("<h4>1000 Genomes</h4>"),(i=e["1000g"][0])?(t.push("<ul class=unstyled>"),i.all_af!=null&&t.push("<li><small>All</small> "+r.utils.Numbers.prettyNumber(i.all_af*100)+"%</li>"),i.amr_af!=null&&t.push("<li><small>American</small> "+r.utils.Numbers.prettyNumber(i.amr_af*100)+"%</li>"),i.afr_af!=null&&t.push("<li><small>African</small> "+r.utils.Numbers.prettyNumber(i.afr_af*100)+"%</li>"),i.eur_af!=null&&t.push("<li><small>European</small> "+r.utils.Numbers.prettyNumber(i.eur_af*100)+"%</li>"),t.push("</ul>")):t.push("<p class=muted>No 1000G frequencies</p>"),t.push('<h4 title="Exome Variant Server">EVS</h4>'),(n=e.evs[0])?(t.push("<ul class=unstyled>"),n.all_af!=null&&t.push("<li><small>All</small> "+r.utils.Numbers.prettyNumber(n.all_af*100)+"%</li>"),n.afr_af!=null&&t.push("<li><small>African</small> "+r.utils.Numbers.prettyNumber(n.afr_af*100)+"%</li>"),n.eur_af!=null&&t.push("<li><small>European</small> "+r.utils.Numbers.prettyNumber(n.eur_af*100)+"%</li>"),t.push("</ul>")):t.push("<p class=muted>No EVS frequencies</p>"),t.join("")},renderEffects:function(e){var n,r,i,o,u,a,f,l;n=[],n.push("<h4>Effects</h4>"),f=!1,t.each(e.effects,function(e){e.transcript!=null&&(f=!0)});if(f){n.push("<ul class=unstyled>"),l=t.groupBy(e.effects,"type");for(a in l){i=l[a],n.push("<li>"),u=s.priorityClass(s.effectImpactPriority(i[0].impact)),n.push("<span class="+u+">"+a+"</span>"),n.push("<ul>");for(var c=0;c<i.length;c++)r=i[c],n.push("<li>"),n.push('<small><a href="http://www.ncbi.nlm.nih.gov/nuccore/'+r.transcript.transcript+'">'+r.transcript.transcript+"</a></small> "),e.uniqueGenes.length>1&&(o=r.transcript.gene)&&n.push('<small>for <a target=_blank href="http://www.genenames.org/data/hgnc_data.php?hgnc_id='+o.hgnc_id+'">'+o.symbol+"</a></small> "),n.push("<ul><li>"),r.hgvs_c&&n.push(""+r.hgvs_c+" "),r.segment&&n.push(""+r.segment+" "),n.push("</li>"),(r.hgvs_p||r.amino_acid_change)&&n.push("<li>"+(r.hgvs_p||r.amino_acid_change)+"</li>"),n.push("</ul>");n.push("</li></ul>")}n.push("</ul>")}else n.push("<p class=muted>No SNPEff effects known</p>");return n.join("")},_renderPhenotypeCollection:function(e){var n,r,i,s;n=[],i=t.sortBy(e,function(e){return e.term}),n.push("<ul>");for(var o=0;o<i.length;o++){r=i[o],n.push("<li>"+r.term);if(r.hpo_id||r.hgmd_id)r.hgmd_id&&n.push(" (HGMD: "+r.hgmd_id+")"),r.hpo_id&&(s=String("0000000"+r.hpo_id).slice(-7),n.push(' (<a href="http://www.human-phenotype-ontology.org/hpoweb/showterm?id=HP_'+s+'">HPO: '+s+"</a>)"));n.push("</li>")}return n.push("</ul>"),n},renderPhenotypes:function(e){var n=[];return n.push("<h4>Phenotypes</h4>"),e.phenotypes[0]?(n.push("<ul class=unstyled>"),n.push("<li>Variant:</li>"),n=n.concat(this._renderPhenotypeCollection(e.phenotypes)),n.push("</ul>")):n.push("<p class=muted>No associated variant phenotypes</p>"),e.uniqueGenes[0]&&(n.push("<ul class=unstyled>"),t.each(e.uniqueGenes,function(e){n.push("<li>"+e.symbol+":</li>"),e.phenotypes[0]?n=n.concat(this._renderPhenotypeCollection(e.phenotypes)):n.push("<p class=muted>No phenotypes for this gene</p>")},this),n.push("</ul>")),n.join("")},_renderArticleCollection:function(e){var n,r,i;n=[],i=t.sortBy(e,function(e){return e}),n.push("<ul>");for(var s=0;s<i.length;s++)r=i[s],n.push('<li><a href="http://www.ncbi.nlm.nih.gov/pubmed/'+r+'">'+r+"</a></li>");return n.push("</ul>"),n},renderPubmed:function(e){var n=[];return n.push("<h4>Articles</h4>"),e.articles[0]?(n.push("<ul class=unstyled>"),n.push("<li>Variant:</li>"),n=n.concat(this._renderArticleCollection(e.articles)),n.push("</ul>")):n.push("<p class=muted>No PubMed articles for this variant</p>"),e.uniqueGenes[0]&&(n.push("<ul class=unstyled>"),t.each(e.uniqueGenes,function(e){n.push("<li>"+e.symbol+":</li>"),e.articles[0]?n=n.concat(this._renderArticleCollection(e.articles)):n.push("<p class=muted>No PubMed articles for this gene</p>")},this),n.push("</ul>")),n.join("")},fetchMetricsError:function(){e("#assessment-metrics").html("<p class=text-error>Error loading metrics.</p>")},fetchMetricsSuccess:function(){var n,r;e("#assessment-metrics").html(""),t.isEmpty(this.metrics.get("metrics"))?e("#assessment-metrics").html("<p class=muted>No assessments have been made on this variant</p>"):(r=this.metrics.get("metrics"),n=[],n.push("<div class=row-fluid>"),n.push("<div class=span4>"),n.push("<strong>Pathogenicities</strong>"+o.assessmentMetrics(r.pathogenicities,!0)),n.push("</div>"),n.push("<div class=span4>"),n.push("<strong>Categories</strong>"+o.assessmentMetrics(r.categories,!0)),n.push("</div>"),n.push("</div>"),n.push("<div class=row-fluid>"),n.push("<table class=assessment-details-table>"),n.push("<thead><tr><th></th><th>Sample</th><th>User</th><th>Pathogenicity</th><th>Category</th><th>Mother</th><th>Father</th><th>Sanger Requested</th></tr></thead>"),n.push("<tbody>"+o.assessmentRows(r.assessments)+"</tbody>"),n.push("</table>"),n.push("</div>"),e("#assessment-metrics").append(n.join(" ")),e(".username-popover").popover())},renderAssessmentMetricsContainer:function(){var e=[];return e.push("<h4>Assessments</h4>"),e.push('<div id=assessment-metrics><img src="'+s.toAbsolutePath("static/images/loader-tiny.gif")+'" /></div>'),e.join("")},_renderExpandCollapse:function(){var e=[];return e.push("<div class=expand-collapse-container>"),e.push('<a href="#" data-target=expand-collapse-link>MORE</a>'),e.push("</div>"),e.join("")},_span:function(t,n){return n==null&&(n=12),e('<div class="span'+n+'" />').html(t)},render:function(){var t,n,r,i;return i=this.model.get("variant"),t=e("<div class=row-fluid data-target=expandable-details-row />"),n=e("<div class=row-fluid data-target=expandable-details-row />"),r=e('<div class="row-fluid  assessments-table-container" />'),t.append(this._span(this.renderSummary(this.model.attributes,i),3)),t.append(this._span(this.renderEffects(i),3).addClass("expandable-details-item").append(this._renderExpandCollapse)),t.append(this._span(this.renderPhenotypes(i),3).addClass("expandable-details-item").append(this._renderExpandCollapse)),t.append(this._span(this.renderPredictions(i),3)),n.append(this._span(this.renderCohorts(i),3).addClass("expandable-details-item").append(this._renderExpandCollapse)),n.append(this._span(this.renderFrequencies(i),3)),n.append(this._span(this.renderPubmed(i),3).addClass("expandable-details-item").append(this._renderExpandCollapse)),r.append(this._span(this.renderAssessmentMetricsContainer(),12)),this.$content.append(t,n,r),this.$el.find(".cohort-sample-popover").popover(),this.metrics.fetch({success:this.fetchMetricsSuccess,error:this.fetchMetricsError}),this.$el}}),a=n.ItemView.extend({template:function(){},el:"#knowledge-capture-content",initialize:function(){t.bindAll(this,"onAssessmentFetchSuccess","onAssessmentFetchError")},update:function(t){this.model==null&&(this.formContainer=e("#knowledge-capture-form-container"),this.feedbackContainer=e("#knowledge-capture-feedback-container"),this.saveButton=e("#save-assessment-button"),this.auditButton=e("#audit-trail-button"),this.errorContainer=e("#error-container"),this.errorMsg=e("#error-message"),e(".alert-error > .close").on("click",this.closeFormErrorsClicked)),this.formContainer.hide(),this.feedbackContainer.show(),this.errorContainer.hide(),this.model=t,this.model.fetch({error:this.onAssessmentFetchError,success:this.onAssessmentFetchSuccess})},onAssessmentFetchError:function(){return this.formContainer.hide(),this.feedbackContainer.hide(),this.errorContainer.show(),this.errorMsg.html("<h5 class=text-error>Error retrieving knowledge capture data.</h5>"),this.saveButton.hide(),this.auditButton.hide()},onAssessmentFetchSuccess:function(){return this.errorContainer.hide(),this.feedbackContainer.hide(),this.formContainer.show(),this.render()},closeFormErrorsClicked:function(t){e(t.target).parent().hide()},isValid:function(){var n=!0;return this.model.set({evidence_details:e("#evidence-details").val(),sanger_requested:e("input[name=sanger-radio]:checked").val(),pathogenicity:e("input[name=pathogenicity-radio]:checked").val(),assessment_category:e("input[name=category-radio]:checked").val(),mother_result:e("#mother-results").val(),father_result:e("#father-results").val()}),this.errorContainer.hide(),this.errorMsg.html(""),t.isEmpty(this.model.get("pathogenicity"))&&(n=!1,this.errorMsg.append("<h5>Please select a pathogenicity.</h5>")),t.isEmpty(this.model.get("assessment_category"))&&(n=!1,this.errorMsg.append("<h5>Please select a category.</h5>")),t.isEmpty(this.model.get("mother_result"))&&(n=!1,this.errorMsg.append("<h5>Please select a result from the &quot;Mother&quot; dropdown.</h5>")),t.isEmpty(this.model.get("father_result"))&&(n=!1,this.errorMsg.append("<h5>Please select a result from the &quot;Father&quot; dropdown.</h5>")),this.model.get("sanger_requested")==null&&(n=!1,this.errorMsg.append("<h5>Please select one of the &quot;Sanger Requested&quot; options.</h5>")),n||this.errorContainer.show(),n},setRadioChecked:function(t,n){var r,i;i=e("input:radio[name="+t+"]"),e(i.prop("checked",!1)),r=e(i.filter("[value="+n+"]")),e(r.prop("checked",!0)),e(r.change())},render:function(){this.setRadioChecked("category-radio",this.model.get("assessment_category")),this.setRadioChecked("pathogenicity-radio",this.model.get("pathogenicity")),this.setRadioChecked("sanger-radio",this.model.get("sanger_requested")),e("#mother-results").val(this.model.get("mother_result")),e("#father-results").val(this.model.get("father_result")),e("#evidence-details").val(this.model.get("evidence_details"))}}),f=n.ItemView.extend({className:"result-details-modal modal hide",maxExpandableHeight:300,showLessText:"Show Less...",showMoreText:"Show More...",template:"varify/modals/result",ui:{variantDetailsTabContent:"#variant-details-content",saveButton:"#save-assessment-button",auditTrailButton:"#audit-trail-button"},events:{"click #close-review-button":"close","click #save-assessment-button":"saveAndClose","click #variant-details-link":"hideButtons","click #knowledge-capture-link":"showButtons","click [data-target=expand-collapse-link]":"toggleExpandedState"},initialize:function(){this.assessmentTab=new a},hideButtons:function(){this.ui.saveButton.hide(),this.ui.auditTrailButton.hide()},showButtons:function(){this.ui.saveButton.show(),this.ui.auditTrailButton.show()},saveAndClose:function(e){this.assessmentTab.isValid()&&(this.assessmentTab.model.save(null,{success:this.onSaveSuccess,error:this.onSaveError}),this.close())},close:function(){this.$el.modal("hide")},onSaveError:function(t,n){e("#review-notification").html("Error saving knowledge capture data."),e("#review-notification").addClass("alert-error"),this.showNotification()},onSaveSuccess:function(t,n){e("#review-notification").html("Saved changes."),e("#review-notification").addClass("alert-success"),this.showNotification(),this.selectedSummaryView.model.fetch()},showNotification:function(){e("#review-notification").show(),setTimeout(this.hideNotification,5e3)},hideNotification:function(){e("#review-notification").removeClass("alert-error alert-success"),e("#review-notification").hide()},onRender:function(){this.$el.modal({show:!1,keyboard:!1,backdrop:"static"})},_checkForOverflow:function(){t.each(e(".expandable-details-item"),function(t){var n,r=!1;for(var i=0;i<t.children.length;i++){n=t.children[i];if(n.offsetTop+n.offsetHeight>this.maxExpandableHeight){r=!0;break}}r?e(t).find(".expand-collapse-container").show():e(t).find(".expand-collapse-container").hide()},this)},toggleExpandedState:function(t){var n,r;n=e(t.target),r=n.closest("[data-target=expandable-details-row]"),n.text()===this.showMoreText?(r.find("[data-target=expand-collapse-link]").text(this.showLessText),r.css("height","auto").css("overflow","visible")):(r.find("[data-target=expand-collapse-link]").text(this.showMoreText),r.css("height",this.maxExpandableHeight).css("overflow","hidden"))},open:function(t,n){var r,s;this.selectedSummaryView=t,this.model=n,s=new i.AssessmentMetrics({},{variant_id:n.get("variant").id,result_id:n.id}),this.detailsTab=new u({model:n,metrics:s}),this.ui.variantDetailsTabContent.html(this.detailsTab.render),r=new i.Assessment({sample_result:this.model.id}),this.model.get("assessment")!=null&&(r.id=this.model.get("assessment").id),this.assessmentTab.update(r),this.$el.modal("show"),e("[data-target=expandable-details-row]").css("height",""+this.maxExpandableHeight+"px").css("overflow","hidden"),e("[data-target=expand-collapse-link]").text(this.showMoreText),this._checkForOverflow()}});return{ResultDetails:f}})