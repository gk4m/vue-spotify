import Vue from "vue";

Vue.filter("msToMinutes", function(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
});

Vue.filter("convertURLs", function(html) {
  let result = html;

  result = result.replace(
    new RegExp("https://open.spotify.com/genre/", "g"),
    "#/genres/"
  );
  result = result.replace(
    new RegExp("spotify:user:spotify:playlist:", "g"),
    "#/user/spotify/playlist/"
  );

  return result;
});
