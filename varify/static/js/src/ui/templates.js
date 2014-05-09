/* global define */

define([
    'cilantro',
    'tpl!../../../templates/controls/polyphen.html',
    'tpl!../../../templates/controls/sift.html',

    'tpl!../../../templates/export/dialog.html',

    'tpl!../../../templates/modals/phenotype.html',
    'tpl!../../../templates/modals/result.html',
    'tpl!../../../templates/modals/sample.html',

    'tpl!../../../templates/sample/loader.html',
    'tpl!../../../templates/sample/row.html',
    'tpl!../../../templates/sample/table.html',

    'tpl!../../../templates/tables/header.html',

    'tpl!../../../templates/variant/article-item.html',
    'tpl!../../../templates/variant/article-group.html',
    'tpl!../../../templates/variant/articles.html',

    'tpl!../../../templates/variant/assessment-metrics.html',
    'tpl!../../../templates/variant/assessment-metrics/percentages.html',
    'tpl!../../../templates/variant/assessment-metrics/percentage-item.html',
    'tpl!../../../templates/variant/assessment-metrics/row.html',
    'tpl!../../../templates/variant/assessment-metrics/table.html',
    'tpl!../../../templates/variant/assessment-metrics/user-popover-item.html',

    'tpl!../../../templates/variant/cohort-item.html',
    'tpl!../../../templates/variant/cohort-popover-item.html',
    'tpl!../../../templates/variant/cohorts.html',

    'tpl!../../../templates/variant/effect-item.html',
    'tpl!../../../templates/variant/effect-type.html',
    'tpl!../../../templates/variant/effects.html',

    'tpl!../../../templates/variant/frequencies.html',

    'tpl!../../../templates/variant/phenotype-item.html',
    'tpl!../../../templates/variant/phenotype-group.html',
    'tpl!../../../templates/variant/phenotypes.html',

    'tpl!../../../templates/variant/scores.html',

    'tpl!../../../templates/variant/clinvar.html',
    'tpl!../../../templates/variant/clinvar-item.html',

    'tpl!../../../templates/variant/summary.html',

    'tpl!../../../templates/workflows/results.html',
    'tpl!../../../templates/workflows/workspace.html',

    'tpl!../../../templates/sample/row.html',
    'tpl!../../../templates/sample/detail.html',
    'tpl!../../../templates/sample/variant-sets.html'
], function(c) {

    var templates = [].slice.call(arguments, 1);
    c.templates.set(templates);

});
