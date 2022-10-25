# ReadMe

These instructions will guide you through the process of deploying an app onto Vercel using BigCommerce, NextJS & ContentStack.

Technologies included in this demo: 
- [BigCommerce](https://www.bigcommerce.com/)
- [Next.js](https://nextjs.org/docs)
- [Vercel](https://vercel.com/dashboard)
- [ContentStack](https://www.contentstack.com/)

These are the first steps you need to complete to be able to follow instructions given during our presentation. 

[Have your own starter?](https://forms.gle/e48caonHNiZBEqDR8)<br/>
[Don't see what you're looking for? Request an option!](https://forms.gle/PYnMDa7SKTRaXzzc6) 


## Let's Get Started! 
<br/>

1. Step One: ✅ You're here! The first step is being in this repo and hitting the "Deploy" button at the bottom of this Read Me. <br/>

2. Hit the "Deploy" button.<br/>
![](images/deploy.png)
<br/>

3. Login to your Vercel Account. If you don't have a Vercel account, make one now! 

4. Hit "GitHub", or whichever platform you are going to use, under "Create Git Repo..." <br/>
![](images/choose_stack.png)
<br/>

5. Enter a name for this repository (it's going to clone itself into your repository platform account) <br/>
![](images/create_a_repo.png)
<br/>

6. Repository being created.. <br/>

7. Login or Sign Up to set up a new BigCommerce store to use! <br/>
![](images/add_bc_to_vercel.png)
<br/>

8. The deploy process begins! This may take up to 10 minutes.<br/>

9. Create an account or login to [ContentStack](https://app.contentstack.com/?_gl=1*2rimkv*_gcl_aw*R0NMLjE2NjU3MDM5NDMuQ2p3S0NBanc3cDZhQmhCaUVpd0E4M2ZHdXNVa1RHRTdOWjZaQ0RoVWJEbjVNMm1odTAwQzRiOW52SDRoZEp2eHJnTGdXYlFLQllLOE1Cb0NPdzBRQXZEX0J3RQ..#!/login). 

10. Create a Stack by selecting "+ New Stack", title it, add a description, and click "Create". <br/>

11. Now that your Stack has been created, let's identify your API keys. Navigate to 
    the "Settings" icon on your lefthand panel. <br/>
    <img src="images/settings.png" alt="settings" width="180"/><br/>
    Now, scroll down and select "Tokens". 

    <img src="images/tokens.png" alt="settings" width="180"/>

    This will take you to a page that has a "+ Delivery Tokens" button. Click that, and enter a name and description for your new API keys. 

    <img src="images/delivery_token.png" alt="settings" height="100"/>

    ![](images/create_new_delivery_token.png)

    Select the proper branch you're working from and your production environment (you may need to also create a production environment). Then click "Generate Token". 

    If successful, you should see something like this: 
    ![](images/new_tokens.png)

12. Add your ContentStack API keys under the "Configure Project" once the fields become available after initial deployment. <br/>
![](images/configure_project.png)
<br/>

13. Hit the "Deploy" button under "Configure Project" once your keys are entered.

14. You're deployed! Great job! 👏 




------ 
<br/>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbigcommerce%2Fnextjs-contentstack-starter&env=CONTENTSTACK_API_KEY,CONTENTSTACK_ACCESS_TOKEN,CONTENTSTACK_ENV&integration-ids=oac_MuWZiE4jtmQ2ejZQaQ7ncuDT&skippable-integrations=1)