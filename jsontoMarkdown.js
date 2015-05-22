var rawJSON = {created_at: 'Thu May 21 19:42:34 +0000 2015',
id: 601473176078577700,
id_str: '601473176078577665',
text: 'RT @ForbesVideo: Congrats to our 30Under30 sports standout James Harden on his second consecutive All-NBA First Team selection! https://t.c…',
source: '`<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>`',
truncated: false,
in_reply_to_status_id: undefined,
in_reply_to_status_id_str: undefined,
in_reply_to_user_id: undefined,
in_reply_to_user_id_str: undefined,
in_reply_to_screen_name: undefined,
user: {"id":864965150,"id_str":"864965150","name":"Dylan Ming","screen_name":"dylan_ming74","location":"Louisburg","url":"https://twitter.com/Dylan04465849","description":"#14Strong #FB #KU19 how much keef could chief keef chief if chief keef could chief keef","protected":false,"verified":false,"followers_count":169,"friends_count":278,"listed_count":1,"favourites_count":1136,"statuses_count":4687,"created_at":"Sat Oct 06 16:45:08 +0000 2012","utc_offset":-18000,"time_zone":"Central Time (US & Canada)","geo_enabled":true,"lang":"en","contributors_enabled":false,"is_translator":false,"profile_background_color":"C0DEED","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/582004959559839744/Fqw9Tw9A_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/582004959559839744/Fqw9Tw9A_normal.jpg","profile_banner_url":"https://pbs.twimg.com/profile_banners/864965150/1424129137","default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},
geo: undefined,
coordinates:  undefined,
place:  undefined,
contributors:  undefined,
retweeted_status: {"created_at":"Thu May 21 19:04:58 +0000 2015","id":601463710951944200,"id_str":"601463710951944193","text":"Congrats to our 30Under30 sports standout James Harden on his second consecutive All-NBA First Team selection!\nhttps://t.co/3UhcwplIfx","source":"<a href=\"http://twitter.com\" rel=\"nofollow\">Twitter Web Client</a>","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":3097564485,"id_str":"3097564485","name":"ForbesVideo","screen_name":"ForbesVideo","location":"","url":"http://forbes.com/video","description":"Official Twitter account for Forbes Video. Constantly in motion. Success, realized.","protected":false,"verified":true,"followers_count":1230,"friends_count":97,"listed_count":11,"favourites_count":14,"statuses_count":187,"created_at":"Thu Mar 19 20:30:37 +0000 2015","utc_offset":-14400,"time_zone":"Eastern Time (US & Canada)","geo_enabled":true,"lang":"en","contributors_enabled":false,"is_translator":false,"profile_background_color":"D6D6D6","profile_background_image_url":"http://pbs.twimg.com/profile_background_images/582648379429117952/VsAWvbD-.jpg","profile_background_image_url_https":"https://pbs.twimg.com/profile_background_images/582648379429117952/VsAWvbD-.jpg","profile_background_tile":false,"profile_link_color":"147ABF","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":false,"profile_image_url":"http://pbs.twimg.com/profile_images/582996781509820416/LuwtBWl3_normal.png","profile_image_url_https":"https://pbs.twimg.com/profile_images/582996781509820416/LuwtBWl3_normal.png","profile_banner_url":"https://pbs.twimg.com/profile_banners/3097564485/1431539415","default_profile":false,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,"coordinates":null,"place":null,"contributors":null,"retweet_count":30,"favorite_count":38,"entities":{"hashtags":[],"trends":[],"urls":[{"url":"https://t.co/3UhcwplIfx","expanded_url":"https://amp.twimg.com/v/857a9403-5afe-4f6d-8740-f9230c7a3fd1","display_url":"amp.twimg.com/v/857a9403-5af…","indices":[111,134]}],"user_mentions":[],"symbols":[]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"filter_level":"low","lang":"en"},
retweet_count: 0,
favorite_count: 0,
entities: {"hashtags":[],"trends":[],"urls":[{"url":"https://t.co/3UhcwplIfx","expanded_url":"https://amp.twimg.com/v/857a9403-5afe-4f6d-8740-f9230c7a3fd1","display_url":"amp.twimg.com/v/857a9403-5af…","indices":[139,140]}],"user_mentions":[{"screen_name":"ForbesVideo","name":"ForbesVideo","id":3097564485,"id_str":"3097564485","indices":[3,15]}],"symbols":[]},
extended_entities:  undefined,
favorited: false,
retweeted: false,
possibly_sensitive: false,
filter_level: 'low',
lang: 'en',
timestamp_ms: 1432237354665};

var jsonToMarkdown = function (obj, level) {
  for (var key in obj) {
    var spaces = '';
    for (var i = 0; i < level; i++) {
      spaces += '  ';
    }
    var bullet = spaces + '* ';

    if (typeof obj[key] !== 'object') {
      console.log(bullet + "**" + key + ":** " + obj[key]);
    } else {
      console.log(bullet + "**" + key + ":** ");
      jsonToMarkdown(obj[key], level+1);
    }
  }
};

jsonToMarkdown(rawJSON, 0);