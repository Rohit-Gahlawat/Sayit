import { PrismaClient } from '../generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from "hono";
import { verify } from 'hono/jwt';
import { z } from "zod";
import { createblogInputSchema, updateblogInputSchema } from '@night-kernel/medium-app-common';

type Variables = {
    userId: string

}

type Bindings = {
    JWT_SECRET: string
    DATABASE_URL: string
}


export const blogRouter = new Hono<{ Variables: Variables; Bindings: Bindings }>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization');
    if (!header) {
        return c.text('Unauthorized', 401)
    }

    const jwt = header.split(" ")[1];
    try {
        const payload = await verify(jwt, c.env.JWT_SECRET, 'HS256')
        if (!payload.id) {
            return c.text('unauthorized', 401)
        }
        c.set('userId', payload.id as string)
    } catch (e) {
        console.log(e)
        return c.text('unauthorized', 401)
    }

    await next()
})
blogRouter.onError((err, c) => {
    console.error(err)

    return c.json(
        {
            success: false,
            error: err.message
        },
        500
    )
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL, })
        .$extends(withAccelerate())

    const body = await c.req.json();
    const userId = c.get('userId');
    const parsed = createblogInputSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid Input" }, 400)
    }

    const blog = await prisma.blog.create({
        data: {
            title: parsed.data.title,
            content: parsed.data.content,
            authorId: userId
        }
    })
    return c.json({ id: blog.id })
})





blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL, })
        .$extends(withAccelerate())

    const body = await c.req.json();
    const userId = c.get('userId')
    const parsed = updateblogInputSchema.safeParse(body);
    if (!parsed.success) {
        return c.json({
            error: "Invalid Inputs"
        })
    }
    const update = await prisma.blog.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: parsed.data.title,
            content: parsed.data.content
        }
    })
    return c.text('Changes Added')
})





blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL, })
        .$extends(withAccelerate());

    const allBlogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });



    return c.json({ blogs: allBlogs });
})


blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL, })
        .$extends(withAccelerate());
    const id = c.req.param('id');
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        },
        select: {

            title: true,
            content: true,
            id: true,
            published: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({ blog: blog })
})