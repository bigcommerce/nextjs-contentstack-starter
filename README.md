# ReadMe

These instructions will guide you through the process of [INSERT PROCESS DESCRIPTION]


- [Have your own starter?](https://forms.gle/e48caonHNiZBEqDR8)<br/>
- [Don't see what you're looking for? Request an option!](https://forms.gle/PYnMDa7SKTRaXzzc6)


Technologies included in this demo: 
- [BigCommerce](https://www.bigcommerce.com/)
- [Next.js](https://nextjs.org/docs)
- [Vercel](https://vercel.com/dashboard)
- [ContentStack](https://www.contentstack.com/)


These are the first steps you need to complete to be able to follow instructions given during our presentation. 

## Let's Get Started! 
<br/>


### Step 1: Create Your BigCommerce Store
You need API keys from BigCommerce, which is why you create the store first. 

Head to [BigCommerce's website](https://www.bigcommerce.com/start-your-trial/?_gl=1*jhwezn*_ga*MjczMTk3MDc5LjE2NjExNzkwMDY.*_ga_WS2VZYPC6G*MTY2NTc1NzQ2NS4xNzMuMS4xNjY1NzU3NzQ1LjUyLjAuMA..&_ga=2.260094666.699882546.1665675452-273197079.1661179006) to create your store. 

![](images/create_store.png)

Fill out the information, and click "Create Your Store". 
<br/>
<br/>
<br/>

### Step 2: Create a ContentStack 
Create an account or login to [ContentStack](https://app.contentstack.com/?_gl=1*2rimkv*_gcl_aw*R0NMLjE2NjU3MDM5NDMuQ2p3S0NBanc3cDZhQmhCaUVpd0E4M2ZHdXNVa1RHRTdOWjZaQ0RoVWJEbjVNMm1odTAwQzRiOW52SDRoZEp2eHJnTGdXYlFLQllLOE1Cb0NPdzBRQXZEX0J3RQ..#!/login). 

Create a Stack by selecting "+ New Stack", title it, add a description, and click "Create". 
<br/>
<br/>
<br/>


### Step 3: Get ContentStack API Keys 
Now that your Stack has been created, navigate to the "Settings" icon on your lefthand panel. 

<img src="images/settings.png" alt="settings" width="180"/>


Now, scroll down and select "Tokens". 

<img src="images/tokens.png" alt="settings" width="180"/>

This will take you to a page that has a "+ Delivery Tokens" button. Click that, and enter a name and description for your new API keys. 

<img src="images/delivery_token.png" alt="settings" height="100"/>

![](images/create_new_delivery_token.png)

Select the proper branch you're working from and your production environment (you may need to also create a production environment). Then click "Generate Token". 

If successful, you should see something like this: 
![](images/new_tokens.png)

<br/>
<br/>
<br/>


### Step 4: Vercel Setup 
First, get a Vercel account set up. 

Then, navigate to the "Add New" drop down and select "Project"
![](images/vercel_new_project.png)
