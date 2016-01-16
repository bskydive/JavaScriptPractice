//window.$(document).ready(function () {
(function ($) {
    "use strict";
    //var $ = window.$, Backbone = window.Backbone, console = window.console, _ = window._;

    $(".c-column-center").addClass("col-md-12");
    $(".c-column-userList").addClass("col-md-3");
    $(".c-label-input-field").addClass("col-md-2");
    $(".c-input-field").addClass("col-md-6");
    //$("#id-container-userAdd").addClass("hidden");


    //function offsetResize() {
    //    var navTopHeight = $('.c-columnNavTop').height();
    //    $(".c-containerMain").css('padding-top', navTopHeight);
    //    $(".c-anchorOffset").css('top', -(navTopHeight - 30));
    //}
    //
    //offsetResize();
    //$(window).resize(function () {
    //    offsetResize();
    //});

    // Generate four random hex digits.
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    // Generate a pseudo-GUID by concatenating random hexadecimal.
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    //============================================MODEL======================================================


    var AppModel = Backbone.Model.extend({
        defaults: {
            username: "",
            state: "start"
        }
    });

    var appModel1 = new AppModel();

    //============================================COLLECTION======================================================

    function checkString(val) {

        return (val.toString() === val.toString);
    }

    function checkStringLength(val, min, max) {

        return (checkString(val) && val.length <= max && val.length >= min);
    }

    var UserListModel = Backbone.Model.extend({
        defaults: {
            firstName: "blankFirstName",
            lastName: "blankLastName",
            surName: "blankSurName",
            birthDate: new Date(1900, 0, 1),
            eMail: "blankEMail@stepanovv.ru",
            phoneNumber: "+71112233344",
            //order: userListView1.nextOrder(),
            guidNumber: guid()
            }

        //validate: function (attrs) {
        //
        //    if (!checkStringLength(attrs.firstName, 3, 25)) {
        //        return "First name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
        //    }
        //
        //    if (!checkStringLength(attrs.lastName, 3, 25)) {
        //        return "Last name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
        //    }
        //
        //    if (!checkStringLength(attrs.surName, 3, 25)) {
        //        return "Surname " + this.guidNumber.toString() + " should be 3 to 25 letters long";
        //    }
        //}
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel

        //findUserName: function (username) {
        //
        //    var findResult = this.find(function (user) {
        //        return user.get("firstName") === username;
        //    });
        //    return findResult !== null;
        //
        //}

    });


    function fillCollection(varCollection) {
        for (var i = 0; i <= 3; i++) {
            varCollection.add(
                {
                    firstName: "FirstName" + i.toString(),
                    lastName: "LastName" + i.toString(),
                    surName: "SurName" + i.toString(),
                    birthDate: new Date(1901, 0, i),
                    eMail: i.toString() + "EMail@stepanovv.ru",
                    phoneNumber: "+7111223334" + i.toString()
                }
            );
        }

        if (varCollection.isValid) {
            console.log(varCollection.validationError);
        }
    }

    var userListCollection1 = new UserListCollection();

    fillCollection(userListCollection1);


    //================================================VIEW==================================================

    var UserListView = Backbone.View.extend({
        //el: '.page',
        //model: new UserListModel(),

        initialize: function () {
            this.render();
        },

        render: function () {
            //var self = this;

            //var userListCollection1 = new UserListCollection();

            //userListCollection1.fetch({
            //    success: function (users) {
            //        var template1 = _.template($('#id-user-list-template').html(), {users: users.models});
            //        that.$el.html(template1);
            //    }
            //});

            //this.$el.html(this.template(this.model.toJSON()));
            //this.model.each(function (eachModel) {
            //    var template1 = _.template($('#id-user-list-template').html(), {eachModel: eachModel.models});
            //    var html = template1(this.model.toJSON());
            //    self.$el.html(html);
            //
            //});

            this.template = _.template($("#id-user-list-template").html(), { userListCollection1 : userListCollection1.models});
            var html = this.template(this.model.toJSON());
            this.$el.html(html);
            return this;
        },

        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        comparator: 'order'
    });


    //==============================================ROUTER====================================================
    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            '!/': 'routeUserList',
            '!/id-container-userAdd': 'routeUserAdd'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();
            $('#id-container-userList').show();
        },

        routeUserAdd: function () {
            $('.c-containerMain').hide();
            $('#id-container-userAdd').show();
        }
    });

    var userListView1 = new UserListView({model: userListCollection1});

    var router1 = new Router();

    router1.on('route:routeUserList', function () {

        userListView1.render();
    });


    Backbone.history.start();


//});


})(jQuery);


//(function ($) {
//
//    Friend = Backbone.Model.extend({
//        //Create a model to hold friend atribute
//        name: null
//    });
//
//    Friends = Backbone.Collection.extend({
//        //This is our Friends collection and holds our Friend models
//        initialize: function (models, options) {
//            this.bind("add", options.view.addFriendLi);
//            //Listen for new additions to the collection and call a view function if so
//        }
//    });
//
//    AppView = Backbone.View.extend({
//        el: $("body"),
//        initialize: function () {
//            this.friends = new Friends( null, { view: this });
//            //Create a friends collection when the view is initialized.
//            //Pass it a reference to this view to create a connection between the two
//        },
//        events: {
//            "click #add-friend":  "showPrompt",
//        },
//        showPrompt: function () {
//            var friend_name = prompt("Who is your friend?");
//            var friend_model = new Friend({ name: friend_name });
//            //Add a new friend model to our friend collection
//            this.friends.add( friend_model );
//        },
//        addFriendLi: function (model) {
//            //The parameter passed is a reference to the model that was added
//            $("#friends-list").append("<li>" + model.get('name') + "</li>");
//            //Use .get to receive attributes of the model
//        }
//    });
//
//    var appview = new AppView;
//})(jQuery);
//

