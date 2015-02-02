---
layout: post
title: Handling uncaught exceptions in Java web applications
category: java
---

In Java web applications we have to be sure we are handling all exceptions and log them in the right way. One common approach that I've used on a few projects is a creation of <a href="http://docs.oracle.com/javaee/5/api/javax/servlet/Filter.html">Filter</a> for every request which will handle that. Here is a very basic example how it may look like.

<script src="https://gist.github.com/yyunikov/7658a2dd46095c85cf7a.js"></script>

You can add multiple catch blocks for different kind of exceptions and even write something to the <a href="http://docs.oracle.com/javaee/5/api/javax/servlet/ServletResponse.html">ServletResponse</a> if needed.

Also, another way of handling exceptions and responding on the different error codes is catching everything in <a href="http://docs.oracle.com/javaee/1.3/api/javax/servlet/http/HttpServlet.html">HttpServlet</a>. In your <code>web.xml</code> file, just create the following configuration.
<script src="https://gist.github.com/yyunikov/25442fe77b94028bcc0f.js?file=error-web.xml"></script>

And create some <code>ErrorHandler</code> class for that.
<script src="https://gist.github.com/yyunikov/25442fe77b94028bcc0f.js?file=ErrorHandler.java"></script>

If you are using <code>Spring</code> or any other popular framework, you just need to create proper request mapping on <code>/error</code> link.