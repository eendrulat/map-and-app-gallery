<%@ WebHandler Language="C#" Class="testAccess" %>
/*
 | Version 10.1.1
 | Copyright 2012 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */

using System;
using System.IO;
using System.Web;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;
using System.Web.Caching;
//============================================================================================================================//

/// <summary>
/// Tests if this program can write into the Uploads directory
/// </summary>
public class testAccess : IHttpHandler
{

    public void ProcessRequest (HttpContext context)
    {
        HttpResponse response = context.Response;

        // Attempt to write the file
        bool ok = false;
        string filename = "checklist_test.txt";
        try
        {
            string filePath = context.Server.MapPath("~/Uploads");
            string fullFilename = filePath + "//" + filename;
            using(StreamWriter s = new StreamWriter(fullFilename))
            {
                DateTime now = DateTime.Now;
                s.Write(now.ToShortDateString() + " " + now.ToLongTimeString());
            }
            ok = true;
        }
        catch(Exception ex)
        {
        }

        response.StatusCode = 200;
        response.Write(ok? "OK" : "no");
        response.End();
        return;
    }

    public bool IsReusable
    {
        get {
            return false;
        }
    }
}

