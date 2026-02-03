import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const onlyJamo = /^(?=.*[가-힣a-zA-Z0-9]).+$/;

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('잘못된 이메일입니다.')
    .required('이메일을 입력해주세요.'),

  password: yup
    .string()
    .matches(passwordRules, {
      message:
        '비밀번호는 8자 이상, 대문자, 소문자, 숫자를 1자 이상 입력하세요.',
    })
    .required('비밀번호를 입력해주세요'),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('잘못된 이메일입니다.')
    .required('이메일을 입력해주세요.'),

  nickname: yup
    .string()
    .min(2, '닉네임을 2자 이상 입력해주세요')
    .matches(onlyJamo, {
      message: '초성만으로 닉네임을 생성 할 수 없습니다.',
    })
    .required('닉네임을 입력해주세요'),

  password: yup
    .string()
    .matches(passwordRules, {
      message:
        '비밀번호는 8자 이상, 대문자, 소문자, 숫자를 1자 이상 입력하세요.',
    })
    .required('비밀번호를 입력해주세요'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
    .required('비밀번호 확인을 입력해주세요'),
});

export type SignUpFormValues = yup.InferType<typeof signUpSchema>;
