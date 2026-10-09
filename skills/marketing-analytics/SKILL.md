---
name: marketing-analytics
description: Measure and analyze Marketing performance from authorized source data with explicit time range/population/metric definitions, reproducible calculations, attribution limitations, and separation of observation from inference.
license: MIT
metadata:
  author: Turpial AI Academy
  version: "0.5.7"
---

# Marketing Analytics

Use for measurement planning, campaign/channel analysis, KPI review, post-campaign learning or evidence-backed recommendations.

## Evidence discipline

Every reported metric should identify source, time range, population/scope and definition. Preserve raw/source references when available.

Do not present attribution, causality, intent or future performance as observed fact.

## Workflow

1. Define the decision/question.
2. Resolve authorized data sources and exact time range/population.
3. Normalize KPI definitions before comparing values.
4. Use deterministic calculations for rates/ratios where possible.
5. Check denominator/coverage/freshness and known tracking changes.
6. Separate observed changes from hypotheses explaining them.
7. Return findings, limitations and next actions/test ideas.

## Deterministic rate calculator

Use `node scripts/compute-rates.mjs --file <metrics.json>`.

Input contains metrics with `name`, `numerator`, and `denominator`. The tool returns exact decimal rates and explicit zero-denominator failures rather than allowing ad-hoc arithmetic in prose.

## Effects

Analytics is read-only by default. Recommendations do not authorize campaign changes.

## Consumer eligibility

Data may to consume Marketing-owned non-paid/portal/organic analytics evidence for source/quality evaluation. This does not transfer Marketing outcome ownership, authorize paid Ads effects or make Data a universal read/write proxy. Recommendations remain read-only and never competent business acceptance.
