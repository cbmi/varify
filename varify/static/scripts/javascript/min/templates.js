define(["underscore","./utils","cilantro/utils/numbers"],function(e,t,n){var r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w;return l=function(e,t){var r;return r=n.toDelimitedNumber(t),'<td class=genomic-position><a target=_blank href="http://genome.ucsc.edu/cgi-bin/hgTracks?position=chr'+e+"%3A"+t+'">chr'+e+" <span class=muted>@</span> "+r+"</a></td>"},m=function(e){var t,n;if(e!=null){t=parseInt(e.rank),n=parseFloat(e.score);if(!isNaN(t)&&!isNaN(n))return"<td>"+t+" <small class=muted>("+n+")</small></td>"}return"<td></td>"},y=function(e){var t;return t=e.name||"",e.hgnc_id?'<a title="'+t+'" target=_blank href="http://www.genenames.org/data/hgnc_data.php?hgnc_id='+e.hgnc_id+'">'+e.symbol+"</a>":'<span title="'+t+'">'+e.symbol+"</span>"},s=function(e){var t;return e!=null&&e.assessment_category!=null?(t=[],t.push("<br />Category:"),t.push(e.assessment_category.name),e.assessment_category.id>2&&t.push('<span class="muted">(Incidental Finding)</span>'),"<span class='assessment-category'>"+t.join(" ")+"</span>"):""},v=function(e){var t;return e!=null&&e.pathogenicity!=null?(t=[],t.push("<br />Pathogenicity: "),t.push(e.pathogenicity.name),"<span class='pathogenicity'>"+t.join("")+"</span>"):""},f=function(e,t){var n,r,i;return t==null&&(t=!1),r=[],i=e.length,i?t||i===1?r.push(y(e[0])):r.push(function(){var t,r,i;i=[];for(t=0,r=e.length;t<r;t++)n=e[t],i.push(y(n));return i}().join(", ")):r.push("<span class=muted>Unknown</span>"),"<td>"+r.join(" ")+"</td>"},p=function(e){var t;return e!=null?(t=e.hgvs_c||"","<td title='"+t+"'>"+t+"</td>"):"<td></td>"},c=function(e,t){var n;return n=""+e+" ("+t+")","<td title='"+n+"'>"+e+" <small>("+t+")</small></td>"},d=function(e){return e!=null?"<td>"+(e.hgvs_p||e.amino_acid_change||"")+"</td>":"<td></td>"},w=function(e){var t;return t=[],t.push(""+e.type),e.transcript!=null&&(t.push("<small>"),t.push(e.transcript.transcript),e.segment!=null&&t.push(" @ "+e.segment),t.push("</small>")),t.push("</small>"),t.join(" ")},g=function(e,n){var r,i,s,o;return n==null&&(n=!1),i=[],o=e.length,o?(n||o===1?(s=t.priorityClass(t.effectImpactPriority(e[0].impact)),i.push('<span class="'+s+'">'+w(e[0])+"</span>")):i.push(function(){var t,n,i;i=[];for(t=0,n=e.length;t<n;t++)r=e[t],i.push(w(r));return i}().join(", ")),"<td>"+i.join(" ")+"</td>"):"<span class=muted>No Effects</span>"},b=function(e){var t;if(e.transcript==null)return"";content.push('<a href="http://www.ncbi.nlm.nih.gov/nuccore/'+transcript.transcript+'">'+transcript.transcript+"</a></small> ");if(attrs.uniqueGenes.length>1&&(t=transcript.gene)&&t)return content.push('<small>for <a target=_blank href="http://www.genenames.org/data/hgnc_data.php?hgnc_id='+t.hgnc_id+'">'+t.symbol+"</a></small> ")},u=function(t){var n,r,i,s,o,u,a,f;n=[],n.push(["dbSNP",t["rsid"]!=null]),n.push(["HGMD",e.pluck(t.phenotypes,"hgmd_id").length>0]),n.push(["1000g",t["1000g"].length>0]),n.push(["EVS",t.evs.length>0]),r=[];for(u=0,a=n.length;u<a;u++)f=n[u],s=f[0],o=f[1],i=o?"text-info":"muted",r.push('<span class="flag '+i+'">'+s+"</span>");return"<td class=flags-container><span class=flags>"+r.join("")+"<span></td>"},o=function(r){var i,s,o,u,a,f,l,c,h,p,d,v,m;o=[];for(h=0,d=r.length;h<d;h++){i=r[h],s="<small>"+i.name+"</small> "+n.prettyNumber(i.af*100)+"% <span class=muted>("+i.size+")</span>",l=[],m=e.sortBy(i.samples,function(e){return e.name});for(p=0,v=m.length;p<v;p++)a=m[p],c="/workspace/samples/"+a.id,l.push("<a href='"+t.toAbsolutePath(c)+"/'>"+a.name+"</a>");f=l.join("<br />"),u="<div>"+$("<div />").html(f).html()+"</div>",o.push("<li class=cohort-details><a href='#' class=cohort-sample-popover title='Samples in Cohort' data-html='true' data-placement=right data-trigger=click data-content='"+u+"'>"+s+"</a></li>")}return"<ul class=unstyled>"+o.join("")+"</ul>"},a=function(e){return'<a target=_blank href="http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs='+e+'">'+e+"</a>"},r=function(t,r){var i;return r==null&&(r=!1),i=[],e.each(t,function(e,t){var s,o,u,a,f,l,c,h,p,d;s=e.is_user_call?"*":"",u=t!=null&&t!==""?t:"N/A",f="<small>"+u+"</small>  "+n.prettyNumber(e.percentage)+"% ",o="<span class=muted>("+e.count+")"+s+"</span>";if(e.usernames.length>0&&r){c=[],d=e.usernames;for(h=0,p=d.length;h<p;h++)l=d[h],c.push(l);a=c.join("<br />"),o="<a href='#' class=username-popover data-trigger=hover title='Users who made this call:' data-html=true data-placement=top data-content='"+a+"'>"+o+"</a>"}return i.push("<li>"+f+o+"</li>")}),"<ul class=unstyled>"+i.join("")+"</ul>"},i=function(n){var r,i;return i=[],r=e.chain(n).groupBy("pathogenicity").value(),e.each(r,function(n,r){var s,o,u,a,f,l;l=[];for(a=0,f=n.length;a<f;a++)s=n[a],o=s.details!=null,i.push("<tr id=assessment-row-"+s.id+">"),o?i.push("<td><a href=#><i class=icon-plus></i><i class='icon-minus hide'></i></a></td>"):i.push("<td></td>"),u="/workspace/samples/"+s.sample.id,i.push("<td><a href='"+t.toAbsolutePath(u)+"/'>"+s.sample.name+"</a></td>"),e.isEmpty(s.user.email)?i.push("<td>"+s.user.username+"</td>"):i.push("<td><a href='mailto:"+s.user.email+"'>"+s.user.username+"</a></td>"),i.push("<td>"+s.pathogenicity+"</td>"),i.push("<td>"+s.category+"</td>"),i.push("<td>"+s.mother_result+"</td>"),i.push("<td>"+s.father_result+"</td>"),i.push("<td>"+s.sanger+"</td>"),i.push("</tr>"),o?l.push(i.push("<tr class='hide no-border' id=assessment-row-"+s.id+"-details><td></td><td colspan='7'><strong>Evidence Details: </strong>"+s.details+"</td></tr>")):l.push(void 0);return l}),i.join("")},h=function(e){var t;return function(){var n,r,i;i=[];for(n=0,r=e.length;n<r;n++)t=e[n],t.hgmd_id!=null&&i.push(t.hgmd_id);return i}().join(", ")},{assessmentMetrics:r,assessmentRows:i,category:s,cohortVariantDetailList:o,condensedFlags:u,dbSNPLink:a,hgmdLinks:h,hgvsC:p,hgvsP:d,geneLinks:f,genomicPosition:l,genotype:c,pathogenicity:v,phenotypeScore:m,variantEffects:g}})