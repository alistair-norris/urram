import { createUser, loginUser } from '~/server/modules/user/user.service'
import { signInSchema } from '~/validators/auth'
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input: { email, password }, ctx }) => {
      const user = await createUser(email, password)
      ctx.session.userId = user.id
      await ctx.session.save()
      return user
    }),
  login: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input: { email, password }, ctx }) => {
      const user = await loginUser(email, password)
      ctx.session.userId = user.id
      await ctx.session.save()
      return user
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    ctx.session.destroy()
    return
  }),
})
