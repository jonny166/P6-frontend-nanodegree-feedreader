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

        /*each feed should have a non-empty url and name*/
        it('has url', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('has name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', function() {
        /*menu element should be hidden by default*/
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /*menu is visible when you click the menu icon*/
        it('is visible after click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        /*menu hidden again if you click the menu icon again*/
        it('is hidden after second click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {
        /* when the loadFeed function is called and completes
         * its work, there is at least a single .entry element
         * within the .feed container.
         */
        beforeEach(function(done) {
            //make sure it starts out empty
            $('.feed').empty();
            loadFeed(1, function() {
                done();
            });
        });
        it('has has entries in feed container', function() {
            expect($('.feed').children().length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {
        /* when a new feed is loaded by the loadFeed function the content 
         * should change. We'll check this by looking at the href values.
         */
        var oldHREFs = [];
        var newHREFs = [];

        beforeEach(function(done) {
            loadFeed(2, function() {
                var children = $('.feed').children();
                for (var j = 0; j < children.length; j++) {
                    oldHREFs.push(children[j].href);
                }

                loadFeed(1, function() {
                    children = $('.feed').children();
                    for (var k = 0; k < children.length; k++) {
                        newHREFs.push(children[k].href);
                    }
                    done();
                });
            });
        });
        it('loads different content for a different feed', function() {
            for (var l = 0; l < newHREFs.length; l++) {
                expect(oldHREFs[l]).not.toEqual(newHREFs[l]);
            };

        });

    });

}());
