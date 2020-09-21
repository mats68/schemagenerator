"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MtCardgridComponent = void 0;
var core_1 = require("@angular/core");
var schemaManager_1 = require("../../base-components/schemaManager");
var MtCardgridComponent = /** @class */ (function () {
    function MtCardgridComponent() {
        this.data = [];
    }
    MtCardgridComponent.prototype.ngOnInit = function () {
        this.data = this.sm.getValue(this.comp);
        this.subsm = new schemaManager_1.SchemaManager(this.comp);
    };
    MtCardgridComponent.prototype.ngOnChanges = function () {
    };
    MtCardgridComponent.prototype.onResize = function (event) {
        this.smallScreen = screen.width < 700;
        //event.target.innerWidth; // window width
    };
    MtCardgridComponent.prototype.Insert = function () {
        var row = {};
        this.subsm.InitValues(row);
        this.currow = row;
        this.data.push(row);
        this.sm.updateValue(this.comp, this.data);
    };
    MtCardgridComponent.prototype.CopyRow = function () {
        if (!this.currow)
            return;
        var newrow = JSON.parse(JSON.stringify(this.currow));
        this.data.push(newrow);
        this.sm.updateValue(this.comp, this.data);
        this.currow = newrow;
        this.subsm.InitValues(newrow);
    };
    MtCardgridComponent.prototype.DeleteRow = function () {
        var _this = this;
        if (!this.currow)
            return;
        this.data = this.data.filter(function (r) { return r !== _this.currow; });
        this.sm.updateValue(this.comp, this.data);
        this.currow = null;
    };
    MtCardgridComponent.prototype.summary = function (row) {
        return this.comp.summary(this.sm, this.comp, row);
    };
    MtCardgridComponent.prototype.rowTitleClick = function (row) {
        if (this.currow !== row) {
            this.currow = row;
            this.subsm.InitValues(row);
        }
        else {
            this.currow = null;
        }
    };
    __decorate([
        core_1.Input()
    ], MtCardgridComponent.prototype, "sm");
    __decorate([
        core_1.Input()
    ], MtCardgridComponent.prototype, "comp");
    MtCardgridComponent = __decorate([
        core_1.Component({
            selector: 'mt-cardgrid',
            templateUrl: './mt-cardgrid.component.html',
            styleUrls: ['./mt-cardgrid.component.scss'],
            host: {
                '(window:resize)': 'onResize($event)'
            }
        })
    ], MtCardgridComponent);
    return MtCardgridComponent;
}());
exports.MtCardgridComponent = MtCardgridComponent;
