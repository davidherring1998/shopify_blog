import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const bear = await prisma.user.create({
    data: {
      // password = 'twixrox'
      username: "bear",
      passwordHashed:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      const data = {
        userId: bear.id,
        ...post,
      };
      return prisma.post.create({ data });
    })
  );
}

function getPosts() {
  return [
    {
      title: "Mastering Shopify Theme Customization",
      body: "Discover the secrets to effectively customizing Shopify themes. This guide provides step-by-step instructions on how to tweak and tailor your Shopify store’s theme to perfectly match your brand’s aesthetic and functional needs, using both Liquid and Shopify’s theme settings.",
    },
    {
      title: "Optimizing Your Shopify Store for SEO",
      body: "Unlock the potential of your Shopify store with proven SEO strategies. This article explores how to optimize your Shopify site for search engines, covering everything from keyword integration in product descriptions to leveraging Shopify’s built-in SEO tools for maximum visibility.",
    },
    {
      title: "Enhancing Shopify Store Performance",
      body: "Speed up your Shopify store with these performance optimization tips. Learn about best practices for reducing load times, optimizing images, and streamlining your store’s code for an improved customer experience and potentially higher conversion rates.",
    },
    {
      title: "Insights into Shopify App Development",
      body: "Dive into the world of Shopify app development. This comprehensive guide covers the fundamentals of developing apps for Shopify, from setting up your development environment to understanding the Shopify API and creating apps that add real value to Shopify stores.",
    },
  ];
}

seed();
