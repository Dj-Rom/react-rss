import { describe, it, expect } from 'vitest'
import formReducer, { addFormData } from '../../store/formSlice'
import type { FormData } from '../../types'

describe('form slice', () => {
    const initialState = { data: [] }

    it('should handle initial state', () => {
        expect(formReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle addFormData', () => {
        const formData: FormData = {
            name: 'John Doe',
            age: 30,
            email: 'john@example.com',
            gender: 'male',
            country: 'Russia',
            photo: '',
        }

        const actual = formReducer(initialState, addFormData({ ...formData, id: 1 }))
        expect(actual.data).toHaveLength(1)
        expect(actual.data[0].name).toEqual('John Doe')
    })
})