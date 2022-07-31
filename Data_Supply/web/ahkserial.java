import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.util.Arrays;
import java.io.File;
import java.util.Scanner;
import java.io.FileReader;

public class ahkserial
{ 
	static int gama=2,nu=11,xi=3;
	static String K = "110";
	static int c=0;
	static File infile = null;
	static String outfile = "";

   //Mapper class 
	public static void main(String args[])throws Exception 
   { 
		long startTime = System.currentTimeMillis();
      //Map function
	       BufferedReader bufferedReader = null;
           BufferedWriter bufferedWriter = null;
		   	if(args.length > 0)
			{
				infile = new File(args[0]);
			}
			outfile= "wm"+args[0];
			System.out.println(outfile);
          try {
            bufferedReader = new BufferedReader(new FileReader(args[0]));
            bufferedWriter = new BufferedWriter(new FileWriter(outfile));
            String s="";
            
            int al[] = new int[11];
            for(int i=0;i<11;i++)
            al[i]=0;
            
            int at_index, bit_index;
            while ((s = bufferedReader.readLine()) != null) {
                    
            	     
                     int bl[] = new int[11];
            	
                     String tok[] = s.split(","); 
        	   
        	         for(int i=0;i<bl.length;i++ )
                     bl[i]=Integer.parseInt(tok[i]);
        	         
        	         System.out.println("------------------------------------------------------");
        	         System.out.println(Arrays.toString(bl));
        	         
        	         for(int i=0;i<bl.length;i++ )
        	        	 al[i]=Math.abs(bl[i]);
        	             
        	       
        	         System.out.println("key is:");
        	         System.out.println(Integer.toString(al[0]));
        	         
        	         
        	         
        	         int first_hash = hash(Integer.toString(al[0]).concat(K));
        	         
        	         int h = hash(Integer.toString(first_hash).concat(K));
        	         
        	         if(h % gama ==0)  // mark this tuple
        	        
        	         {
        	        	 int m = h % nu;
        				  
        	        	    if(m<0)
        				      at_index = (m + nu);
        			        else 
        			          at_index = m;
        				
        				
        				  int n =h % xi;
        	                    
        				     if(n<0)
        	                      bit_index = (n + xi);
        	                 else
        				          bit_index = n;

        	        	 
        	        	 
        				     System.out.println("number before marking : "+al[at_index]);
        	             
        	                 al[at_index] = mark(al[0],al[at_index],bit_index,K);
        	                 
        	                 System.out.println("number after marking : "+al[at_index]);
        	                 
        	                 
        	         } 
        	         String br=Integer.toString(al[0]);
        	         for(int i =1;i<al.length;i++)
	                	 br=br+","+Integer.toString(al[i]);
        	        	 
        	        	 bufferedWriter.write(br);
	                     bufferedWriter.newLine();	    
            }
          
          }
          
          catch (FileNotFoundException e) {
              e.printStackTrace();
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // close without throwing exception
        	  
           bufferedReader.close();
           bufferedWriter.close();
           
          }
          
          
          
          }        
              
	 static int mark(int pk, int attri, int bit, String sec_key)
     {
	       int number=0,i;
         	System.out.println("bit value is" + bit);  
		String key = sec_key.concat(Integer.toString(pk));
		int first_hash = hash(key);            //hash function

               System.out.println("first hash is:  " + first_hash);

		int[] BinaryNum = convertBinary(attri);
		
              int Length = BinaryNum.length;

		 System.out.println("length of binary array "+Length);
                
	         //  if (attri == 0) Length=1;
   
		    if(Length>0 || Length==0)  
                     {
                       for(int l=0;l<Length;l++)
                       System.out.println(BinaryNum[l]);

   			if(bit>=Length)
   			{
  			     int[] B = new int[xi];

                          for( i=0;i<xi;i++)
                          B[i]=0;

                           for(i=0;i<xi;i++)
                           System.out.print("\t"+B[i]);

		                int j=Length-1;
     				for(i=B.length-1;i>=0;i--)   
      				 {
        			 if(j>=0)
         				{
            				 B[i] = BinaryNum[j];
             				j--;
           				}
         			}
                      
                       int  m = B.length-(bit + 1); 
                      
			System.out.println("LSB bit is : "+m);
			if(first_hash % 2 == 0)
                               B[m]=0;
                       else 
                               B[m]=1;
                       
		         number = convertDecimal(B);
			
               	}
		        
    		       else
                       {	
       
			int n= (Length )-(bit + 1) ;
		    	System.out.println("LSB bit is :  "+n);

                          if(first_hash % 2 == 0) 
				BinaryNum[n]=0;
      			   else  
				BinaryNum[n]=1;
			
                       number = convertDecimal(BinaryNum);
		        }
                   c++;
              
                  
		  }// end of binarynum>0
                    
       return number;
}
  
	

     
     
     static int hash (String pk) 

     {
    	int decimal=0;
    	try
    	{
            	//String s = " p"; 
           		MessageDigest md = MessageDigest.getInstance("MD5");
           		md.update(pk.getBytes());
     		byte byteData[] = md.digest();
     		//convert the byte to hex format method 1
            	StringBuffer sb = new StringBuffer();
            	
    			for (int i = 0; i < byteData.length; i++)
            		{
             			sb.append(Integer.toString((byteData[i] & 0xff) +0x100, 16).substring(1));
            		}
     			StringBuffer hexString = new StringBuffer();

          				for (int i=0;i<byteData.length;i++) 
            			{
        					String hex=Integer.toHexString(0xff & byteData[i]);
       		     			if(hex.length()==1) hexString.append('0');
       		     			hexString.append(hex);
        	   			}
    				String result=hexString.toString();
    				decimal = hex2decimal(result);
     	}

    	catch(java.security.NoSuchAlgorithmException e)
    	{
    		System.out.println(e);}
    		//System.out.println(result);
    	        //System.out.println(decimal);
             	return decimal;  
    	}
      
     
     public static int hex2decimal(String s)
     {
         String digits = "0123456789ABCDEF";
         s = s.toUpperCase();
         int val = 0;
         for (int i = 0; i < s.length(); i++)
         {
             char c = s.charAt(i);
             int d = digits.indexOf(c);
             val = 16*val + d;
         }

         return val;
     }

 public static int[] convertBinary(int n)
    {
         int i = 0;
         int b[] = new int[1000];
          
         int[] x=new int[1];
         x[0]=0;
         
         if(n==0) return x;
         
         if(n<0) n=Math.abs(n);
         
         while (n > 0)
             {
                b[i] = n % 2;
                n = n / 2;
                i++;
             }
 			
             int c[] = new int[i];		
             int k = 0;
           
 	    for (int j = i-1; j >=0; j--)
 		{
        		     c[k] = b[j];
 	 	     k++;
             	}	
             return c;
     
  
     }
 public static int convertDecimal(int binary[])
     {
 	int t = 0;
         int s=0;
         int r;
 	for( r = binary.length-1;r>=0;r-- )
 		{
 			int  h = power(2,t);
 			int f = binary[r] * h;
 			s=s+f;
 			t++;
 		}
         return s;
     }
 
 static int power(int c, int d)
 {       
     int n=1;
     for(int i=0;i<d;i++)
    	        {
        		n=c*n;
   	        }
     return n;
 }

     
        
}    
      