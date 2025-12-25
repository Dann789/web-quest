import prisma from "../../prisma/client";

export async function getUser() {
    try {
        const users = await prisma.user.findMany({ orderBy: { id: "asc" } });

        return {
            success: true,
            message: "List Data User!",
            data: users,
        };
    } catch (e: unknown) {
        console.error(`Error getting users: ${e}`);
    }
}

export async function createUser(options: {name: string; email: string; password: string}) {
    try {
        const { name, email, password } = options;

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });

        return {
            success: true,
            message: "User Created Successfully!",
            data: user,
        }
    } catch (e: unknown) {
        console.error(`Error creating user: ${e}`);
    }
}

export async function getUserById(id: string) {
    try {
        const userId = parseInt(id);

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        // Jika id tidak ditemukan
        if (!user) {
            return {
                success: true,
                message: "Detail User Not Found!",
                data: null,
            }
        }

        return {
            success: true,
            message: "Detail User Found!",
            data: user,
        }
    } catch (e: unknown) {
        console.error(`Error getting user: ${e}`);
    }
}

export async function updateUser(id: string, options: {name?: string; email?: string; password?: string}) {
    try {
        const userId = parseInt(id);

        const { name, email, password } = options;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name ? { name } : {}),
                ...(email ? { email } : {}),
                ...(password ? { password } : {}),
            },
        });

        return {
            success: true,
            message: "User Updated Successfully!",
            data: user,
        }
    } catch (e: unknown) {
        console.error(`Error updating user: ${e}`);
    }
}

export async function deleteUser(id: string) {
    try {
        const userId = parseInt(id);

        await prisma.user.delete({
            where: { id: userId },
        });

        return {
            success: true,
            message: "User Deleted Successfully!",
        }
    } catch (e: unknown) {
        console.error(`Error deleting User: ${e}`);
    }
}