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


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', function() {
            expect(document.body.className).toContain('menu-hidden');//html body has to contain a class named menu-hidden
        });



        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Menu is shown when clicked once', function() {
            $('.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');//once the icon is clicked it is shown
        });

        it('Menu is hidden when clicked twice', function() {
            $('.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');//when the icon is clicked again, the menu is hidden
        });

    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */

        var entryElements;
        var check;

      beforeEach(function(done) {
            loadFeed(0, done);// this is to know that beforeEach has done all the tasks mentioned within its function scope
                              /* Mentor's note: When you pass done to a function as an argument, jasmine will not run the rest of the code until you call done()*/
        });


        it('Atleast a single element is present in the feed', function(done) {
            entryElements = $('.feed').contents().find('.entry');/*grabs the details within the entry selector inside the feed
                                                                   Here, feed is the parent of entry*/
            expect(entryElements.length).toBeGreaterThan(0); // there should be atleast one entry element for this test to pass
            done();
        });


    });



    /* A new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

        var latest;
        var old;
        beforeEach(function(done) {
            loadFeed(1, function() {
                latest = $('.feed').html();//the new feed that loads asynchronously is saved in the variable latest
                done();

            });
        });

      it("New feed is shown", function(done) {
         loadFeed(0, function() {
                old = $('.feed').html();
                expect(latest).not.toEqual(old);//the old and new feed shouldn't be the same for this test to pass
                done();
            });
        });

    });
}());
