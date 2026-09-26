<?php

test('the site starts in light mode when no appearance is saved', function () {
    $this->get('/')
        ->assertOk()
        ->assertDontSee('<html lang="en" class="dark"', false)
        ->assertSee("localStorage.getItem('appearance') || 'light'", false);
});

test('a saved dark appearance cookie still renders the page dark', function () {
    $this->withUnencryptedCookie('appearance', 'dark')
        ->get('/')
        ->assertSee('class="dark"', false);
});
