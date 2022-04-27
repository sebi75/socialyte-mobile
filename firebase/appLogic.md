Users will be able to follow / unfollow people
--> exactly like on instagram

Users who follow somebody will be able to see the things he / she posts on their feed
!! it doesn't apply the other way around

How we get the feed on the front end?
//Simply query the media collection like the following:
**_
const mediaCollection = collection(db, "media")
const q = query(mediaCollection, where("mediaOwner", "==", user.uid))
_**
// we will get all the posts from the people one user is following
but we don't want to get all the posts, because it would be too much data
and also too old data.

    //we will use another query to get the latest posts
    in the media documents there will be a field called "createdAt"
    so we can make use of that to get posts that are newer for most active users and for users that didn't connect in a while we will get more older posts
