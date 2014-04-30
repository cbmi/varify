define(["jquery","underscore","./utils","cilantro/utils/numbers"],function(e,t,n,r){var i=function(e,t){var n=r.toDelimitedNumber(t);return'<td class=genomic-position><a target=_blank href="http://genome.ucsc.edu/cgi-bin/hgTracks?position=chr'+e+"%3A"+t+'">chr'+e+" <span class=muted>@</span> "+n+"</a></td>"},s=function(e){if(e!=null){var t=parseInt(e.rank,10),n=parseFloat(e.score);if(!isNaN(t)&&!isNaN(n))return"<td>"+t+" <small class=muted>("+r.prettyNumber(n)+")</small></td>"}return"<td><small class=muted>unranked</small></td>"},o=function(e){var t=e.name||"";return e.hgnc_id?'<a title="'+t+'" target=_blank href="http://www.genenames.org/data/hgnc_data.php?hgnc_id='+e.hgnc_id+'">'+e.symbol+"</a>":'<span title="'+t+'">'+e.symbol+"</span>"},u=function(e){if(e!=null&&e.assessment_category!=null){var t=[];return t.push("<br />Category:"),t.push(e.assessment_category.name),e.assessment_category.id>2&&t.push("<span class=muted>(Incidental Finding)</span>"),"<span class=assessment-category>"+t.join(" ")+"</span>"}return""},a=function(e){if(e!=null&&e.pathogenicity!=null){var t=[];return t.push("<br />Pathogenicity: "),t.push(e.pathogenicity.name),"<span class=pathogenicity>"+t.join("")+"</span>"}return""},f=function(e,t){t==null&&(t=!1);var n=[],r=e.length;if(!r)n.push("<span class=muted>Unknown</span>");else if(t||r===1)n.push(o(e[0]));else{var i=[];for(var s=0;s<e.length;s++)i.push(o(e[s]));n.push(i.join(", "))}return"<td>"+n.join(" ")+"</td>"},l=function(e){return e!=null?(text=e.hgvs_c||"",'<td title="'+text+'">'+text+"</td>"):"<td></td>"},c=function(e,t){var n=""+e+" ("+t+")";return'<td title="'+n+'">'+e+" <small>("+t+")</small></td>"},h=function(e){return e!=null?"<td>"+(e.hgvs_p||e.amino_acid_change||"")+"</td>":"<td></td>"},p=function(e){var t=[];return t.push(""+e.type),e.transcript!=null&&(t.push("<small>"),t.push(e.transcript.transcript),e.segment!=null&&t.push(" @ "+e.segment),t.push("</small>")),t.push("</small>"),t.join(" ")},d=function(e,t){t==null&&(t=!1);var r=[],i=e.length;if(!i)return"<span class=muted>No Effects</span>";if(t||i===1){var s=n.priorityClass(n.effectImpactPriority(e[0].impact));r.push('<span class="'+s+'">'+p(e[0])+"</span>")}else{var o=[];for(var u=0;u<e.length;u++)o.push(p(e[u]));r.push(o.join(", "))}return"<td>"+r.join(" ")+"</td>"},v=function(e){var n=[];n.push(["dbSNP",e["rsid"]!=null]),n.push(["HGMD",t.pluck(e.phenotypes,"hgmd_id").length>0]),n.push(["1000g",e["1000g"].length>0]),n.push(["EVS",e.evs.length>0]),e.solvebio&&e.solvebio.clinvar&&n.push(["ClinVar",e.solvebio.clinvar.total>0]);var r=[],i,s,o;for(var u=0;u<n.length;u++)i=n[u][0],s=n[u][1],o=s?"text-info":"muted",r.push('<span class="flag '+o+'">'+i+"</span>");return"<td class=flags-container><span class=flags>"+r.join("")+"<span></td>"},m=function(e){return'<a target=_blank href="http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs='+e+'">'+e+"</a>"},g=function(e,n){n==null&&(n=!1);var i=[];return t.each(e,function(t,s){var o,u,a,f=t.is_user_call?"*":"",l=s!=null&&s!==""?s:"N/A",c="<small>"+l+"</small>  "+r.prettyNumber(t.percentage)+"% ",h="<span class=muted>("+t.count+")"+f+"</span>";if(t.usernames.length>0&&n){a=[];for(var p=0;p<e.usernames;p++)a.push(e.usernames[p]);o=a.join("<br />"),h='<a href="#" class=username-popover data-trigger=hover title="Users who made this call" data-html=true data-placement=top data-content="'+o+'">'+h+"</a>"}i.push("<li>"+c+h+"</li>")}),"<ul class=unstyled>"+i.join("")+"</ul>"},y=function(e){var r=[],i=t.chain(e).groupBy("pathogenicity").value();return t.each(i,function(e,i){var s,o,u;for(var a=0;a<e.length;a++)s=e[a],o=s.details!=null,r.push("<tr id=assessment-row-"+s.id+">"),o?r.push('<td><a href=#><i class=icon-plus></i><i class="icon-minus hide"></i></a></td>'):r.push("<td></td>"),u="/workspace/samples/"+s.sample.id,r.push('<td><a href="'+n.toAbsolutePath(u)+'/">'+s.sample.name+"</a></td>"),t.isEmpty(s.user.email)?r.push("<td>"+s.user.username+"</td>"):r.push('<td><a href="mailto:'+s.user.email+'">'+s.user.username+"</a></td>"),r.push("<td>"+s.pathogenicity+"</td>"),r.push("<td>"+s.category+"</td>"),r.push("<td>"+s.mother_result+"</td>"),r.push("<td>"+s.father_result+"</td>"),r.push("<td>"+s.sanger+"</td>"),r.push("</tr>"),o&&r.push('<tr class="hide no-border" id=assessment-row-'+s.id+"-details><td></td><td colspan=7><strong>Evidence Details: </strong>"+s.details+"</td></tr>")}),r.join("")};return{assessmentMetrics:g,assessmentRows:y,category:u,condensedFlags:v,dbSNPLink:m,hgvsC:l,hgvsP:h,geneLinks:f,genomicPosition:i,genotype:c,pathogenicity:a,phenotypeScore:s,variantEffects:d}})