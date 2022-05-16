MAIN TODOS:

Find a new way to get the media urls than getting it while getting all the posts

The current method increases the time getting the media because for every post
wee need also to do another async request to get the download media.

Current speed: We need at least 200ms to get one post's media URL

So if we cobine the time when fetching them, it will result in very bad performance.
Another solution would be dispatching progressively one by one posts to load them.
