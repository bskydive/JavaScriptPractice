window.$(document).ready(function () {
    "use strict";
    var $ = window.$, Backbone = window.Backbone, console = window.console, _ = window._;

    $(".c-column-center").addClass("col-md-12");
    $(".c-column-userList").addClass("col-md-3");
    $(".c-label-input-field").addClass("col-md-2");
    $(".c-input-field").addClass("col-md-6");
    //$("#id-container-userEdit").addClass("hidden");


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


    //============================================COLLECTION======================================================

    function genuuid() {

        return window.Date.now().toString() + "-" + Math.random().toString(36).substring(2, 15);
    }


    function checkString(val) {

        return (val.toString() === val.toString);
    }

    function checkStringLength(val, min, max) {

        return (checkString(val) && val.length <= max && val.length >= min);
    }

    function validateFirstName(attrs) {
        
        if (!checkStringLength(attrs.firstName, 3, 25)) {
            return "First name " + attrs.uuidNumber.toString() + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateLastName(attrs) {
        
        if (!checkStringLength(attrs.lastName, 3, 25)) {
            return "Last name " + attrs.uuidNumber.toString(attrs) + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateSurName(attrs) {
        if (!checkStringLength(attrs.surName, 3, 25)) {
            return "Surname " + attrs.uuidNumber.toString() + " should be 3 to 25 letters long";
        }
    }

    function validateBirthDate(attrs) {
        new Date(1900, 0, 1);
    }

    function validateEMail(attrs) {
        "blankEMail@stepanovv.ru"
    }

    function validatePhoneNumber(attrs) {
        "+71112233344"
    }

    function validateUuidNumber(attrs) {
        genuuid(attrs)
    }


    var UserListModel = Backbone.Model.extend({
        defaults: {
            firstName: "blankFirstName",
            lastName: "blankLastName",
            surName: "blankSurName",
            birthDate: new Date(1900, 0, 1),
            eMail: "blankEMail@stepanovv.ru",
            phoneNumber: "+71112233344",
            uuidNumber: genuuid(),
            idAttribute: "uuidNumber"
        },

        validate: function (attrs) {

            


            


}
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel

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

    function toLocalDate(varDate) {
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

        var varLocale = "ru-RU";

        return varDate.toLocaleString(varLocale, options).toString();
    }

    var UserListView = Backbone.View.extend({
        el: "#id-tbody-userList",
        events: {
            'click .c-btn-edit': 'eventUserEdit',
            'click .c-btn-delete': 'eventUserDelete'
        },

        render: function () {
            var self = this;
            this.$el.html("");

            this.collection.each(
                function (eachModel) {
                    var template = _.template($("#id-user-list-template").html());
                    eachModel.set('birthDateLocal', toLocalDate(eachModel.get('birthDate')));
                    var html = template(eachModel.toJSON());
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


    var UserEditView = Backbone.View().extend({
        el: "#id-form-userEdit",
        events: {
            'click #id-btn-cancel': 'eventUserSave',
            'click #id-btn-save': 'eventUserSave',
            'click #id-btn-delete': 'eventUserDelete'
        },

        eventUserSave: function () {

            this.collection.saveList;
            //validation

            this.router.navigate('', {trigger: true});
            return false;
        },

        eventUserDelete: function () {
            //this.user.destroy({
            //    success: function () {
            //        console.log('destroyed');
            //        router.navigate('', {trigger: true});
            //    }
            //});
            this.router.navigate('', {trigger: true});
            return false;
        },


        render: function (options) {

            this.$el.html("");

            if (options.uuid) {

                var modelByUuid = this.collection.get(options.uuid);

                //todo add error on absent uuid's
                var template = _.template($("#id-form-userEdit").html());
                modelByUuid.set('birthDateLocal', toLocalDate(modelByUuid.get('birthDate')));
                var html = template(modelByUuid.toJSON());

                self.$el.prepend(html);

            }
            return this;
        }
    });

    //==============================================ROUTER====================================================
    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            'add': 'routeUserAdd',
            'edit/:uuidLink': 'routeUserEdit',
            'delete/:uuidLink': 'routeUserDelete'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();

            userListView1.render();

            $('#id-container-userList').show();
        },

        routeUserAdd: function () {
            $('.c-containerMain').hide();
            userEditView1.render();
            $('#id-container-userEdit').show();
        },

        routeUserEdit: function (uuidLink) {
            $('.c-containerMain').hide();
            userEditView1.render({uuid: uuidLink});
            $('#id-container-userEdit').show();

        }

        //routeUserDelete: function () {
        //    $('.c-containerMain').hide();
        //
        //    userEditView1.deleteUser({uuid: uuidLink});
        //    $('#id-container-userEdit').show();
        //}
    });


    //==============================================CALCULATIONS====================================================

    var router1 = new Router();

    var userListCollection1 = new UserListCollection();

    fillCollection(userListCollection1);

    var userListView1 = new UserListView({collection: userListCollection1, router: router1});

    var userEditView1 = new UserEditView({collection: userListCollection1, router: router1});

    Backbone.history.start();


});