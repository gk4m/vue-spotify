# vue-spotify
Spotify client built with vue.js / vuex.

Authenticated users must have a valid Spotify Premium subscription because if it doesn't, Web Playback SDK will not work.

![alt text](https://github.com/gk4m/vue-spotify/blob/master/public/example/BrowseView.png "Browse")
![alt text](https://github.com/gk4m/vue-spotify/blob/master/public/example/SearchView.png "Search")
![alt text](https://github.com/gk4m/vue-spotify/blob/master/public/example/PlaylistView.png "Playlist")

## Features

#### Authorization
* Login
* Logout
* Refresh token

#### Search
* Get Spotify Catalog information about artists, albums, tracks or playlists that match a keyword string.

#### Browse
* Get a List of Categories
* Get New Releases

#### Playlist manipulation
* Get a user's playlists
* Create playlists

#### Follow
* Follow a playlist
* Unfollow a playlist

#### Player
* Get a user's available devices
* Connect to another device
* Start/Resume a User's Playback
* Get the User's Currently Playing Track
* Set volume
* Skip User’s Playback To Next Track
* Skip User’s Playback To Previous Track
* Seek playback to a given position
* Toggle Shuffle For User’s Playback
* Set Repeat Mode On User’s Playback

## Read more
* [Spotify web API](https://developer.spotify.com/documentation/web-api/)
* [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)

