import { reactive } from 'vue';

const controlsHandler = reactive({
    controls: {},

    addControl(category, name, control) {
        if (!this.controls[category]) this.controls[category] = {};
        this.controls[category][name] = control;
    },

    removeControl(category, name) {
        delete this.controls[category][name];
    },

    updateKey(category, name, key) {
        // ? : check if key is already assigned
        // for (const cat in this.controls) {
        //     const category = this.controls[cat];
        //     for (const ctrl in category) {
        //         const control = category[ctrl];
        //         if (control.key === key) {
        //             return;
        //         }
        //     }
        // }
        
        if (this.controls[category][name]) {
            this.controls[category][name].key = key;
        }
    },

    removeCategory(category) {
        delete this.controls[category];
    },

    event(key) {
        for (const cat in this.controls) {
            const category = this.controls[cat];
            for (const ctrl in category) {
                const control = category[ctrl];
                if (control.key === key) {
                    control.function.call(null, control.arguments || []);

                    // ? : return if a key can only be set to one action
                    // return;
                }
            }
        }
    }
});

export { controlsHandler }