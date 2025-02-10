\clearpage

# Introduction

My two previous papers Triple System Analysis ( \tsa) and Adaptive Analysis ( \trs) explain how to use multi-level knowledge graphs for system analysis [@h_triple_2023] [@h_adaptive_2024]. A Flow Visualization Practionary ( \ada) uses the combined material/data flow model from \trs\hspace{-3pt},  and simplifies the symbols.  The reader will find it helpful to review \tsa and \trs.

## Human Cognition First

![Top](images/Top.svg){#fig:top s=.63}


We tend to work with systems backwards.  We look at the exhaust data from systems and hope to understand our direction, when we should really be focusing on where we are, where we want to go, and what dangers lie on our route before looking at the currents propelling our boat. Our systems should conform to our needs, not the needs of a provider, framework or existing systems.  There can be some savings in the short-term by going with the flow and purchasing the dominant service; however, when rapid change in requirements and features are needed to adapt to new situations, the technical debt accumulated by not leading with human cognition increases the risk of capsizing in the rapids. To get our bearings, humans can consider roughly 3 classes of objects related in one dimension, which can be seen as players, tools, and teams towards a common goal [@tomasello_understanding_2005].  We have limits on how much information we can consider in real-time to make decisions [@zheng_unbearable_2025].  What form of knowledge works best for the thin layer of communication that comprises our conscious mind [@murphy_propofol_2011] [@noauthor_decoding_nodate]?  Semiotics are cognitive shortcuts that can help.  I use icons for \tsa, \trs, and \ada, rather than titles, to make it clear that I mean the idea of the entire paper.   I use other conventions in the model that help the reader understand complex systems without dense dialog.  Charles Peirce developed more sophisticated versions of these ideas, and the title of this paper is an homage to Michael K. Bergman, a follower of his [@bergman_knowledge_2018].   I have had professional success using knowledge graphs and semiotics in the form of Gane and Sarson knowledge graphs [@h_triple_2023] [@gane_structured_1977].  I've spent much time since then trying to understand why it worked so well and developing tools, constraints, and methods that helped with the challenges. [@Fig:top] Shows the set of symbols used in my combined material and data flow model. The rounded blue boxes are transformations of data or materials.  The teal boxes are agents that are the sources or sinks of data or materials.  The reddish-brown boxes store data or materials at rest.  Each symbol is a node that is connected with other nodes, and is called a graph.  Besides color and node shape, dotted lines within the node represent data.  Solid lines represent materials.  As I explained in \trs, data flow diagrams are behind agents that operate transforms.  This is why I think it is OK to mix the nodes, as most of the function is behind the screens, the black box of the device or report that assists the transform. Magenta dots in the corner of a transform/process node mean you can zoom in to it by clicking.  An orange dot means you can hover for notes and narrative.  A blue dot in the lower right corner means there is a connection to the associated full data flow.


## Third Kiss of the Pig
This is my third paper.  My dad would say it is my "third kiss of the pig", meaning that this is my last chance at getting the prize.  Since I'm immersed in the idea of triples, calling this my last paper seems appropriate.  There should be three.  Also, for health reasons, I need to back off a bit from my pace.  I've been working on these ideas every waking moment since May, 2019, with the rest of my life shoehorned in.  I need to reverse that.  I still feel very strongly that this is what I can add, something that fits within a mature understanding of progress [@project_development_2024]; however, I need to take a more balanced approach to my life going forward.

I spent some time this morning considering the format and my toolchain. The PDF format is useful, as I can upload it and people can view without additional software.  Even if I just add on to the bottom for each article, no big deal.  The PDF is still available, as is the Markdown.  The document is Pandoc friendly, as it is created with Pandoc, so people can export to whatever format they like.  This is a practionary.  It does not delve in to the ideas of \trs or \tsa.  I think this will work just fine.

\clearpage



# Practionary

![T](images/toptext.svg){#fig:gs s=3.2}

## Graphs



### Creating a Graph



In \tsa I wrote about the whiteboard technique to gather information collaboratively.  I also wrote about how these ideas can be thought of as mind mapping, and even gave an example of how to export a mind map directly to triples.  \trs introduced graph stack format.  Let's use that to create the graph in [@Fig:top] .
 
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut purus elit, vestibulum
ut, placerat ac, adipiscing vitae, felis. Curabitur dictum gravida mauris. Nam
arcu libero, nonummy eget, consectetuer id, vulputate a, magna. Donec vehicula
augue eu neque. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Mauris ut leo. Cras viverra metus rhoncus
sem. Nulla et lectus vestibulum urna fringilla ultrices. Phasellus eu tellus sit
amet tortor gravida placerat. Integer sapien est, iaculis in, pretium quis, viverra
ac, nunc. Praesent eget sem vel leo ultrices bibendum. Aenean faucibus. Morbi
dolor nulla, malesuada eu, pulvinar at, mollis ac, nulla. Curabitur auctor semper
nulla. Donec varius orci eget risus. Duis nibh mi, congue eu, accumsan eleifend,
sagittis quis, diam. Duis eget orci sit amet orci dignissim rutrum.

Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor
lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ultricies et, tellus.
Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae
ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis. Suspendisse ut
massa. Cras nec ante. Pellentesque a nulla. Cum sociis natoque penatibus
et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tincidunt urna.
Nulla ullamcorper vestibulum turpis. Pellentesque cursus luctus mauris.
Nulla malesuada porttitor diam. Donec felis erat, congue non, volutpat at,
tincidunt tristique, libero. Vivamus viverra fermentum felis. Donec nonummy
pellentesque ante. Phasellus adipiscing semper elit. Proin fermentum massa ac
quam. Sed diam turpis, molestie vitae, placerat a, molestie nec, leo. Maecenas
lacinia. Nam ipsum ligula, eleifend at, accumsan nec, suscipit a, ipsum. Morbi
blandit ligula feugiat magna. Nunc eleifend consequat lorem. Sed lacinia nulla
vitae enim. Pellentesque tincidunt purus vel magna. Integer non enim. Praesent
euismod nunc eu purus. Donec bibendum quam in tellus. Nullam cursus pulvinar
lectus. Donec et mi. Nam vulputate metus eu enim. Vestibulum pellentesque
felis eu massa.

Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus
tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In
hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis.
Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed
gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim.
Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae
risus porta vehicula.

Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus
tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In
hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis.
Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed
gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim.
Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae
risus porta vehicula.

Fusce mauris. Vestibulum luctus nibh at lectus. Sed bibendum, nulla a faucibus
semper, leo velit ultricies tellus, ac venenatis arcu wisi vel nisl. Vestibulum
diam. Aliquam pellentesque, augue quis sagittis posuere, turpis lacus congue
 
\setstretch{.5}
\vspace{10pt}
```{#lst:mod .javascript .numberLines}

``` 
\setstretch{1}

\clearpage

# References

<div id="refs"></div>

\newpage

\

\newpage