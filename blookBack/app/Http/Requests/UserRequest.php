<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\User;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        if ($this->isMethod('POST')) {
            return [
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:8',
                'phone_number' => 'required|min:9',
                'date_of_birth' => 'required|date_format:d/m/Y',
                'gender' => 'required|string',
                'is_admin' => 'boolean',
                'profile_pic' => 'image'
            ];
        }

        if ($this->isMethod('PUT')) {
            return [
                'email' => 'email|unique:users,email',
                'phone_number' => 'min:9',
                'date_of_birth' => 'date_format:d/m/Y',
                'gender' => 'string',
            ];
        }
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }

    public function messages()
    {
        return [
            'name.required' => 'Insira o seu nome',
            'email.required' => 'Insira o seu email',
            'email.email' => 'Formato do email inválido',
            'email.unique' => 'Email já cadastrado',
            'password.required' => 'Insira sua senha',
            'password.min' => 'Insira um minimo de caracteres na sua senha',
            'date_of_birth.required' => 'Insira sua data de nascimento',
            'phone_number.required' => 'Insira o seu número de telefone',
            'phone_number.min' => 'Insira um mínimo de caracteres no seu número de telefone',
            'date_of_birth.date_format' => 'Formato de data inválida',
            'genre.required' => 'Insira o seu gênero',
            'profile_pic' => 'Formato de imagem inválida'
        ];
    }
}
