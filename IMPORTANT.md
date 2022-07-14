FOLLOWERS AND FOLLOWING for users will have their own collection:

    their followers and following will be fetched only when requested

the collection is named: "connections":

        the user's id is the key
        the value is an following and followers array
        following and followers are arrays of objects that contain minimum to display the users in a list like:

        {
            name: string,
            id: string,
            avatar: string
        }
