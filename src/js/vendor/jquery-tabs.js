/**
 * Tabs
 * Copyright © 2018, Alexander Griffioen <mail@oscaralexander.com>
 * Published under MIT license.
 */

const pluginName = 'tabs'

class Tabs {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init() {
        this.$panels = this.$el.find('[role="tabpanel"]')
        this.$tabs = this.$el.find('[role="tab"]')
        this.$tabs.on('click', this.onClickTab.bind(this))
        this.$tabs.filter('[aria-selected="true"]').trigger('click')
    }

    onClickTab(e) {
        e.preventDefault()

        const $tab = $(e.currentTarget)
        const $panel = $(`#${$tab.attr('aria-controls')}`)

        this.$tabs.attr('aria-selected', false)
        $tab.attr('aria-selected', true)

        this.$panels.attr('aria-hidden', true)
        $panel.attr('aria-hidden', false)
    }
}

$.fn[pluginName] = function(options) {
    return this.each((i, el) => {
        const instance = $(el).data(pluginName) || null

        if (!instance) {
            $(el).data(`plugin_${pluginName}`, new Tabs(this, options))
        } else {
            if (typeof options === 'string') {
                instance[options]()
            }
        }
    })
}