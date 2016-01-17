window.$(document).ready(function () {

    "use strict";
    var $ = window.$, Backbone = window.Backbone, console = window.console, _ = window._;

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

    function genUid() {

            return window.Date.now().toString() +"-" + Math.random().toString(36).substring(2, 15) + "-" + Math.random().toString(36).substring(2, 15);
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
            uidNumber: genUid()
            },

        validate: function (attrs) {

            if (!checkStringLength(attrs.firstName, 3, 25)) {
                return "First name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }

            if (!checkStringLength(attrs.lastName, 3, 25)) {
                return "Last name" + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }

            if (!checkStringLength(attrs.surName, 3, 25)) {
                return "Surname " + this.guidNumber.toString() + " should be 3 to 25 letters long";
            }
        }
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel,

        findUserName: function (username) {

            var findResult = this.find(function (user) {
                return user.get("firstName") === username;
            });
            return findResult !== null;

        }

    });


    function fillCollection(varCollection) {
        for (var i = 0; i <= 3; i++) {
            varCollection.add(
                {
                    firstName: "FirstName" + i.toString(),
                    lastName: "LastName" + i.toString(),
                    surName: "SurName" + i.toString(),
                    birthDate: new Date(1901, 0, i),
                    birthDateLocal: "",
                    eMail: i.toString() + "EMail@stepanovv.ru",
                    phoneNumber: "+7111223334" + i.toString()
                }
            );
        }

        if (varCollection.isValid) {
            console.log(varCollection.validationError);
        }
    }

    //================================================VIEW==================================================

    var UserListView = Backbone.View.extend({
        el: "#id-tbody-userList",

        toLocalDate: function(varDate, varLocale){
            var options = {
                //era: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
                //weekday: 'long',
                //timezone: 'UTC',
                //hour: 'numeric',
                //minute: 'numeric',
                //second: 'numeric'
            };

            return varDate.toLocaleString(varLocale, options).toString();
        },

        render: function () {
            var self = this;
            this.$el.html("");

            this.model.each(
                function(ulModel){
                    var template = _.template($("#id-user-list-template").html());
                    ulModel.set( 'birthDateLocal', self.toLocalDate(ulModel.get('birthDate'), "ru"));
                    var html = template(ulModel.toJSON());
                    self.$el.append(html);

                }
            );
            return this;
        }

        //nextOrder: function () {
        //    if (!this.length) {
        //        return 1;
        //    }
        //    return this.last().get('order') + 1;
        //},
        //
        //comparator: 'order'
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


    //==============================================CALCULATIONS====================================================

    var userListCollection1 = new UserListCollection();

    fillCollection(userListCollection1);

    var userListView1 = new UserListView({model: userListCollection1});

    var router1 = new Router();

    router1.on('route:routeUserList', function () {
        userListView1.render();
    });


    Backbone.history.start();


});