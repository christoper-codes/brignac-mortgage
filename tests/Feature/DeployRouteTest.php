<?php

beforeEach(function () {
    config(['deploy.token' => 'test-secret-token']);
});

test('the deploy route refuses requests with no token', function () {
    $this->get('/deploy/optimize-clear')->assertForbidden();
});

test('the deploy route refuses requests with the wrong token', function () {
    $this->get('/deploy/optimize-clear?token=not-it')->assertForbidden();
});

test('the deploy route refuses an unknown action even with the right token', function () {
    $this->get('/deploy/drop-everything?token=test-secret-token')->assertNotFound();
});

test('the deploy route runs a known command with the right token', function () {
    $this->get('/deploy/optimize-clear?token=test-secret-token')->assertOk();
});

test('the deploy route is unusable if no token is configured on the server', function () {
    config(['deploy.token' => null]);

    $this->get('/deploy/optimize-clear?token=anything')->assertForbidden();
});
