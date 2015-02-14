---
layout: post
title: Working with local SQLite database
category: android
tags: android database sqlite
updated: 2015-02-04
---

While creating Android apps, we often use SQLite database to store some data. Sometimes we just need to reuse the existing database stored locally on the device. One of the ways is just to store your local SQLite database in <code>/res/assets</code> folder. Let's consider this example and look at one of the approaches for using it in code.


**Creating database helper classes**

First thing that we need to do is to create a class, which extends <code>SQLiteOpenHelper</code> and looks for our database in the <code>/res/assets</code> folder of your Android app.
<github-gist gistid="0e8448d0b7eeaee71782" file="SQLiteAssetsHelper.java"></github-gist>

We can create a simple [Singleton](http://en.wikipedia.org/wiki/Singleton_pattern) which extends <code>SQLiteAssetsHelper</code> and overrides it's <code>onCreate()</code> and <code>onUpgrade()</code> methods. Let's leave them empty for now, but you can do upgrading of your database here or any other work needed on creation of your database later.
<github-gist gistid="0e8448d0b7eeaee71782" file="DbHelper.java"></github-gist>

Taking into account the fact that we need to open and get the database instance to work with it all the time, we can create a simple manager for that. This class will also help to prevent the concurrent access to our database, because we use <code>synchronized</code> word here.
<github-gist gistid="0e8448d0b7eeaee71782" file="DbManager.java"></github-gist>

**Database entities and queries**

If in our local database we have multiple entities, it would be good to make some superclass for them.
<github-gist gistid="0e8448d0b7eeaee71782" file="Entity.java"></github-gist>

One of the popular ways of quering objects is the <a href="http://en.wikipedia.org/wiki/Data_access_object">DAO</a> pattern.
To make easier creating of <code>DAO</code> classes we can create a master class for them which will contain some of the common popular methods, mostly the <a href="http://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a> operations.
<github-gist gistid="0e8448d0b7eeaee71782" file="DaoMaster.java"></github-gist>

If we will need to create <code>DAO</code> class for some entity later, we will just extend the <code>DaoMaster</code> class.


** Common Adapter**

To make our life easier in future when working with <code>ListView</code>, <code>Spinner</code> or any other Android views which need <code>Adapter</code> classes, we can create a parent <code>Adapter</code> class for our entities.
<github-gist gistid="0e8448d0b7eeaee71782" file="EntityAdapter.java"></github-gist>


**Usage and Example**

The adapter above will very useful in future, when you will create a new <code>Entity</code>. Let's consider the example if we have the new <code>Entity</code> from the database called <code>NamedEntity</code>.
<github-gist gistid="0e8448d0b7eeaee71782" file="NamedEntity.java"></github-gist>

Creating an adapter for such entity will be easy and look in the following way.
<github-gist gistid="0e8448d0b7eeaee71782" file="NamedEntityAdapter.java"></github-gist>

After writing such a lot of code, let's take a loook on the example usage of everthing together that we've created. I will assume that we have an entity called <code>Some</code> (which extends <code>Entity</code> class) and the <code>DAO</code> for it, called <code>SomeDao</code> (which extends <code>DaoMaster</code> class).
<github-gist gistid="0e8448d0b7eeaee71782" file="Usage.java"></github-gist>

**Conclusion**

Described approach of working with local database may look very complicated, however it helps a lot if you have multiple entities and queries to your local database and showed itself for me as a good long term solution.
