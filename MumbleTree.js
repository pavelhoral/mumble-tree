/**
 * Constructor.
 * @param Object params Possible values are:
 *     Object url JSONP generator URL.
 */
var MumbleTree = function(params) {
    this._url = params["url"];
    this._id = MumbleTree._list.length;
    // Register instance
    MumbleTree._list[this._id] = this;
    // Render
    this._render();
    return this;
};

// Static list of MumbleTree instances
MumbleTree._list = [];

/**
 * Render user and channel tree.
 * @param Object tree
 */
MumbleTree.prototype._renderTree = function(tree) {
    var channelHtml = "";
    if (tree.channels.length > 0) {
        for (var i = 0; i < tree.channels.length; i++) {
            channelHtml += "<li>" + this._renderTree(tree.channels[i]) + "</li>";
        }
        channelHtml = '<ul class="channelList">' + channelHtml + "</ul>";
    }
    var userHtml = ""
    if (tree.users.length > 0) {
        for (var i = 0; i < tree.users.length; i++) {
            userHtml += '<li><span class="userName">'
                + tree.users[i] + "</spa></li>";
        }
        userHtml = '<ul class="userList">' + userHtml + "</ul>";
    }
    return '<span class="channelName">'
        + tree.name + "</span>" + channelHtml + userHtml;
};

/**
 * Get container element identifier.
 * @return String
 */
MumbleTree.prototype._getContainerId = function() {
    return "_mumbleTree" + this._id;
};

/**
 * Get container element node.
 * @return HTMLElement
 */
MumbleTree.prototype._getContainer = function() {
    return document.getElementById(this._getContainerId());
};

/**
 * Render container and create JSONP request.
 */
MumbleTree.prototype._render = function() {
    document.write('<div id="' + this._getContainerId() +
            '" class="mumbleTree"></div>');
    document.write('<script type="text/javascript" src="' +
        this._url + "?callback=MumbleTree._list[" + this._id + 
        "]._handleTree" + '"></script>');
};

/**
 * JSONP callback.
 * @param Object tree
 */
MumbleTree.prototype._handleTree = function(tree) {
    this._getContainer().innerHTML = mumbleTree._renderTree(tree);
};

