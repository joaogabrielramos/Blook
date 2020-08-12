<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\User;

class BookRequest extends FormRequest
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
                'author' => 'required',
                'image' => 'image',
                'text' => 'required',
            ];
        }

        if ($this->isMethod('PUT')) {
            return [
                'image' => 'image'
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
            'name.required' => 'Insira o nome do livro',
            'author.required' => 'Insira o nome do autor do livro',
            'text.required' => 'Insira a descrição',
            'image.image' => 'Formato inválido'
        ];
    }
}
