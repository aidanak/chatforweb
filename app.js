var stat = {
  userLength: 0
};
var author,receiver;
var pushMessage = function(text){
  var k;
  if(author>receiver){
    k=author+receiver;
  }
  else{
    k=receiver+author;
  }
  if(!space.get(k))
    space.set(k, []);
  var messages=space.get(k);
  messages.push({
    author: author,
    text: text,
  });
  space.set(k,messages);
};
var getAllMessages=function(){
  var k;
  if(author>receiver){
    k=author+receiver;
  }
  else{
    k=receiver+author;
  }
  if(!space.get(k))
    space.set(k, []);
  var messages=space.get(k);
  var div = getMessagesDiv();
  var bl;
  for(var i = 0; i < messages.length; i++){
    if(messages[i].author==author) {
      bl=1;
    }
    else{
      bl=0;
    }
    div.append(renderMessagesInSpan(messages[i].text,bl));
  }
};
var getUserList = function(){
  return space.get('users');
};

var getUserNameHolder = function(){
  return $('.user-name-bold');
};
var getReceiverHolder = function(){
  return $('.receiver-holder');
};
var run = function(name){
  getUserNameHolder().text(name);
  author=name;
  if(!space.get('users'))
    space.set('users', []);

  var tmp = space.get('users');
  tmp.push({
    name: name,
  });

  space.set('users', tmp);

  showOtherUsers(name);
  updateUserList();
  updateMessages();
};

var renderUserNameInSpan = function(name){
  return '<div><div class="usernames" style="border: 1px solid black;width:450px;background-color:#2196F3";margin:2px;><center>' + name + '</center></div></div>';
};
var renderMessagesInSpan = function(message,bl){
  if(bl) return '<div><div class="message" style="margin: 0 auto; text-align: right"><span style="background-color:white">' + message + '</span></div></div>';
  else return '<div><div class="message" style="margin: 0 auto; text-align: left"><span style="background-color:white">' + message + '</span></div></div>';
};
var getUserNamesDiv = function(){
  return $('.other-users');
};
var getMessagesDiv=function(){
  return $('.messages');
};
var clearOtherUsers = function(){
  getUserNamesDiv().html('');
};
var clearMessagesDiv = function(){
  getMessagesDiv().html('');
};
var showOtherUsers = function(name){
  var users = space.get('users');

  stat.userLength = users.length;

  var div = getUserNamesDiv();
  for(var i = 0; i < users.length; i++){
    if(users[i].name!=author) div.append(renderUserNameInSpan(users[i].name));
  }
};

var updateUserList = function(){
  setInterval(function(){
    clearOtherUsers();
    showOtherUsers();
  }, 2000);
};
var updateMessages= function(){
  setInterval(function(){
    clearMessagesDiv();
    getAllMessages();
  }, 1000);
};
var space = {
  get: function(key){
    return JSON.parse(localStorage.getItem(key));
  },

  set: function(key, val){
    var tmp = JSON.stringify(val);
    localStorage.setItem(key, tmp);
  },

  remove: function(key){
    localStorage.removeItem(key);
  },

  clear: function(){
    localStorage.clear();
  }
};

$(document).ready(function(){
  var name = prompt('Please enter your name');
  run(name);
  $('.other-users').on('click', '.usernames', function() {
    receiver=$(this).text();
    getReceiverHolder().text(receiver);
    clearMessagesDiv();
    getAllMessages();
  });

 $('#msend').click(function(){
    var text=$('#mtext').val();
    $('#mtext').val('');
    if(text!=null){
      pushMessage(text);
    }
    clearMessagesDiv();
    getAllMessages();
  });
  
});
