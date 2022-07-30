we don't need to check for things like: the user exists, or other things that are
neccessary to be true / valid and be set by us in the client.

if an attacker tries to send faked requests, regarding the data, the firebase backend already checks for that and has the validation set.
