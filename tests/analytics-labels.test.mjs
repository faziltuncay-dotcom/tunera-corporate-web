// Display-label contract for the admin analytics dashboard.
//
// `labels.ts` is purely cosmetic — it never mutates stored values.
// These tests pin the mappings the operator sees on the dashboard
// (paths, section keys, event names) plus the safety behaviour for
// missing / unknown input. They also lock down the low-data
// threshold so a future refactor can't silently drop the
// "directional only" disclaimer.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LOW_DATA_THRESHOLD,
  eventLabel,
  isLowData,
  pathLabel,
  scrollDepthLabel,
  sectionLabel,
} from "./fixtures/labels.mjs";

test("pathLabel maps the documented public routes", () => {
  assert.equal(pathLabel("/"), "Ana Sayfa");
  assert.equal(pathLabel("/tr"), "Ana Sayfa");
  assert.equal(pathLabel("/en"), "Home");
  assert.equal(pathLabel("/tr/markalar"), "Markalar");
  assert.equal(pathLabel("/markalar"), "Markalar");
  assert.equal(pathLabel("/en/brands"), "Brands");
  assert.equal(pathLabel("/tr/iletisim"), "İletişim");
  assert.equal(pathLabel("/en/contact"), "Contact");
});

test("pathLabel falls through to the raw path for unknown values", () => {
  assert.equal(pathLabel("/some/legacy/path"), "/some/legacy/path");
});

test("pathLabel returns em-dash for nullish / empty input", () => {
  for (const bad of [null, undefined, "", 42, {}]) {
    assert.equal(pathLabel(bad), "—", String(bad));
  }
});

test("sectionLabel maps every Phase-2 section key", () => {
  assert.equal(sectionLabel("home_hero"), "Ana sayfa hero");
  assert.equal(sectionLabel("home_about"), "Tunera tanıtım");
  assert.equal(sectionLabel("home_services"), "Hizmetler özeti");
  assert.equal(sectionLabel("brands_intro"), "Markalar giriş");
  assert.equal(sectionLabel("brands_cards"), "Marka kartları");
  assert.equal(sectionLabel("contact_intro"), "İletişim giriş");
  assert.equal(sectionLabel("contact_details"), "İletişim bilgileri");
  assert.equal(sectionLabel("contact_maps"), "Harita / lokasyon");
});

test("sectionLabel falls through to the raw key for unknown values", () => {
  assert.equal(sectionLabel("some_future_section"), "some_future_section");
});

test("eventLabel maps every documented event name", () => {
  assert.equal(eventLabel("page_view"), "Page view");
  assert.equal(eventLabel("section_view"), "Section view");
  assert.equal(eventLabel("scroll_depth"), "Scroll depth");
  assert.equal(eventLabel("brand_card_click"), "Brand card click");
  assert.equal(eventLabel("brand_redirect_click"), "Brand redirect");
  assert.equal(eventLabel("contact_email_click"), "Email click");
  assert.equal(eventLabel("contact_map_click"), "Map click");
  assert.equal(eventLabel("contact_phone_click"), "Phone click");
  assert.equal(eventLabel("contact_whatsapp_click"), "WhatsApp click");
  assert.equal(eventLabel("language_switch"), "Language switch");
});

test("eventLabel falls through to the raw event for unknown values", () => {
  assert.equal(eventLabel("some_future_event"), "some_future_event");
});

test("scrollDepthLabel formats numeric milestones as 'X% reached'", () => {
  assert.equal(scrollDepthLabel(25), "25% reached");
  assert.equal(scrollDepthLabel("50"), "50% reached");
  // Tolerates a stored "75%" string (already-suffixed)
  assert.equal(scrollDepthLabel("75%"), "75% reached");
  assert.equal(scrollDepthLabel(100), "100% reached");
});

test("scrollDepthLabel returns em-dash for nullish input", () => {
  assert.equal(scrollDepthLabel(null), "—");
  assert.equal(scrollDepthLabel(undefined), "—");
});

test("isLowData and LOW_DATA_THRESHOLD pin the directional-only threshold", () => {
  assert.equal(LOW_DATA_THRESHOLD, 5);
  assert.equal(isLowData(0), true);
  assert.equal(isLowData(4), true);
  assert.equal(isLowData(5), false);
  assert.equal(isLowData(99), false);
});

test("isLowData treats nullish / non-finite input as low data", () => {
  assert.equal(isLowData(null), true);
  assert.equal(isLowData(undefined), true);
  assert.equal(isLowData(Number.NaN), true);
  assert.equal(isLowData(Number.POSITIVE_INFINITY), true);
});
