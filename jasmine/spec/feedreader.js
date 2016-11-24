/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //  #8 - loops through allFeeds to check for urls
        it('have non-empty URLs', function() {
            allFeeds.forEach(function(feedSource) {
                // url property exists for each feed source
                expect(feedSource.url).toBeDefined();
                // the url is not empty
                expect(feedSource.url.length).not.toBe(0);
            });
        });

        //  #9 - loops through allFeeds to check for names
        it('have non-empty names', function() {
            // same as url loop but looking for name
            allFeeds.forEach(function(feedSource) {
                expect(feedSource.name).toBeDefined();
                expect(feedSource.name.length).not.toBe(0);
            });
        });
    });

    // #10
    describe('The menu', function() {
        // #11 - menu element is hidden? (has class menu-hidden)
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // #12 - test menu button
        it('toggles with button click', function() {
            // if($('body').hasClass('menu-hidden')) {
            //   $('.menu-icon-link').trigger('click');
            //   expect($('body').hasClass('menu-hidden')).toBe(false);
            // } else {
            //   $('.menu-icon-link').trigger('click');
            //   expect($('body').hasClass('menu-hidden')).toBe(true);
            // };
            // opens the menu; use else if? ^^

            // first click
            $('.menu-icon-link').trigger('click');
            // should toggle menu-hidden off (from default on)
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // second click
            $('.menu-icon-link').trigger('click');
            // should toggle menu-hidden back on
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // #13
    describe('Initial Entries', function() {
        // #14 - check for entries AFTER async load
        beforeEach(function(done) {
            loadFeed(0, done);
            // loadFeed id is the index, cb is callback or done (as in addressbook project)
        });
        it('contain at least 1 element', function() {
            // checks to see if the count of containers with class entry is > 0
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // #15
    describe('New Feed Selection', function() {
        // #16 - check for content change on loadFeed call
        // create 2 variables to hold feed data for comparison
        var initialFirst;
        var loadedFirst;
        // runs through 2 feed loads and saves text from the first article's title (stored in h2)
        beforeEach(function(done) {
            // start with 1 so it ends up showing content from 0
            loadFeed(1, function() {
                loadedFirst = $('h2:first').text();
                // end with 0 so it shows this content
                // this is only working if it is inside the first loadFeed - undefined if it's placed elsewhere
                loadFeed(0, function() {
                    initialFirst = $('h2:first').text();
                    done();
                });
            });
        });
        it('gives new feeds', function(done) {
            // compares the titles from the first entries to see if different
            expect(loadedFirst).not.toBe(initialFirst);
            done();
        });
    });

}());
