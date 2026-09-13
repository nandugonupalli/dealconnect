import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['dealer', 'manufacturer', 'admin']),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['dealer', 'manufacturer']),
  shopName: z.string().optional(),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>