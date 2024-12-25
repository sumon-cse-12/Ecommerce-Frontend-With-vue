import {
  ErrorMessage,
  configure,
  defineRule,
  Form as VeeForm,
  Field as VeeField,
} from "vee-validate";

import {
  required,
  email,
  min,
  confirmed,
  min_value as minVal,
  max_value as maxVal,
  not_one_of as excluded,
  alpha_spaces as alphaSpaces,
} from "@vee-validate/rules";

export default {
    install(app){
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    email: `The field ${ctx.field} must be a valid email.`,
                    min: `The field ${ctx.field} is too short.`,
                    confirmed: `The field ${ctx.field} does not match.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
                    alpha_spaces: `The field ${ctx.field} may only contain alphabetic characters and spaces.`,
                };

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

                return message;
            },
        });

        defineRule('required', required);
        defineRule('email', email);
        defineRule('min', min);
        defineRule('confirmed', confirmed);
        defineRule('min_value', minVal);
        defineRule('max_value', maxVal);
        defineRule('excluded', excluded);
        defineRule('alpha_spaces', alphaSpaces);
    }
}
